<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    // Group permissions logically by functional module
    protected function getGroupedPermissions(): array
    {
        $permissions = Permission::orderBy('name')->get();
        $grouped = [];

        foreach ($permissions as $perm) {
            $parts = explode('.', $perm->name);
            $module = ucfirst($parts[0] ?? 'General');

            $grouped[$module][] = [
                'id' => $perm->id,
                'name' => $perm->name,
                'label' => ucwords(str_replace('.', ' ', $perm->name)),
            ];
        }

        return $grouped;
    }

    // List all roles with counts
    public function index(): Response
    {
        $roles = Role::withCount(['users', 'permissions'])
            ->orderBy('name')
            ->get();

        return Inertia::render('admin/roles/RoleList', [
            'roles' => $roles,
        ]);
    }

    // Display form to create new role
    public function create(): Response
    {
        return Inertia::render('admin/roles/RoleForm', [
            'isEdit' => false,
            'groupedPermissions' => $this->getGroupedPermissions(),
        ]);
    }

    // Store new role and assign permissions
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:50', 'unique:roles,name'],
            'permissions' => ['array'],
            'permissions.*' => ['string', 'exists:permissions,name'],
        ]);

        $role = Role::create(['name' => strtolower(str_replace(' ', '_', $validated['name']))]);

        if (! empty($validated['permissions'])) {
            $role->syncPermissions($validated['permissions']);
        }

        return redirect()->route('admin.roles.index')->with('success', 'Role created successfully.');
    }

    // Display form to edit role and permissions
    public function edit(Role $role): Response
    {
        return Inertia::render('admin/roles/RoleForm', [
            'isEdit' => true,
            'role' => [
                'id' => $role->id,
                'name' => $role->name,
                'permissions' => $role->permissions()->pluck('name')->toArray(),
            ],
            'groupedPermissions' => $this->getGroupedPermissions(),
        ]);
    }

    // Update role name and permissions
    public function update(Request $request, Role $role): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:50', Rule::unique('roles', 'name')->ignore($role->id)],
            'permissions' => ['array'],
            'permissions.*' => ['string', 'exists:permissions,name'],
        ]);

        // Prevent renaming super_admin
        if ($role->name === 'super_admin' && $validated['name'] !== 'super_admin') {
            return back()->with('error', 'The super_admin role name cannot be modified.');
        }

        $role->update(['name' => strtolower(str_replace(' ', '_', $validated['name']))]);
        $role->syncPermissions($validated['permissions'] ?? []);

        return redirect()->route('admin.roles.index')->with('success', 'Role updated successfully.');
    }

    // Remove role if not super_admin and has no assigned users
    public function destroy(Role $role): RedirectResponse
    {
        if ($role->name === 'super_admin') {
            return back()->with('error', 'The super_admin role cannot be deleted.');
        }

        if ($role->users()->count() > 0) {
            return back()->with('error', 'Cannot delete role because it is currently assigned to staff members. Reassign them first.');
        }

        $role->delete();

        return redirect()->route('admin.roles.index')->with('success', 'Role deleted successfully.');
    }
}
