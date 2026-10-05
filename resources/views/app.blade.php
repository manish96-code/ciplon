<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="description" content="ApexBio Pharmaceuticals — Advancing healthcare through research, quality manufacturing, and global distribution of finished pharmaceutical formulations." />

    <title inertia>{{ config('app.name', 'ApexBio') }}</title>

    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
    @inertiaHead
</head>
<body class="bg-white text-slate-900 antialiased">
    @inertia
</body>
</html>
