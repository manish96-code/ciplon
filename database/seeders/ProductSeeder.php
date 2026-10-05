<?php

namespace Database\Seeders;

use App\Enums\ProductStatus;
use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    // Seed pharmaceutical products with multi-image gallery support and detailed compositions.
    public function run(): void
    {
        $admin = User::first();
        $adminId = $admin?->id;

        $productsData = [
            // Antibiotics & Antimicrobials
            [
                'category_slug' => 'antibiotics-and-antimicrobials',
                'brand_name' => 'AmoxiClav 625 Duo',
                'generic_name' => 'Amoxicillin & Potassium Clavulanate Tablets IP',
                'product_code' => 'APX-AB-001',
                'dosage_form' => 'Film-Coated Tablet',
                'strength' => '625 mg',
                'short_description' => 'Broad-spectrum antibiotic combining amoxicillin with potassium clavulanate to combat resistant bacterial infections.',
                'description' => 'AmoxiClav 625 Duo provides comprehensive antibacterial coverage against beta-lactamase producing organisms. Indicated for severe lower and upper respiratory tract infections, acute otitis media, urinary tract infections, and post-surgical prophylactic care.',
                'indications' => 'Acute bacterial sinusitis, community-acquired pneumonia, acute exacerbations of chronic bronchitis, uncomplicated skin infections, and dental abscesses.',
                'directions' => '1 tablet twice daily with meals to optimize absorption and reduce gastrointestinal discomfort, or as directed by a healthcare professional.',
                'precautions' => 'Contraindicated in patients with severe penicillin or cephalosporin hypersensitivity. Monitor renal and hepatic parameters during prolonged therapeutic regimens.',
                'storage' => 'Store in a cool, dry place protected from light and moisture at a temperature below 25°C.',
                'prescription_type' => 'Rx Only',
                'is_featured' => true,
                'images' => [
                    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
                ],
                'compositions' => [
                    ['ingredient_name' => 'Amoxicillin Trihydrate', 'strength' => '500', 'unit' => 'mg'],
                    ['ingredient_name' => 'Clavulanic Acid (as Potassium Clavulanate)', 'strength' => '125', 'unit' => 'mg'],
                ],
            ],
            [
                'category_slug' => 'antibiotics-and-antimicrobials',
                'brand_name' => 'AzithroCare 500',
                'generic_name' => 'Azithromycin Dihydrate Tablets IP',
                'product_code' => 'APX-AB-002',
                'dosage_form' => 'Film-Coated Tablet',
                'strength' => '500 mg',
                'short_description' => 'Potent macrolide antimicrobial with high tissue penetration for convenient 3-day treatment regimens.',
                'description' => 'AzithroCare 500 selectively binds to the 50S ribosomal subunit of susceptible microorganisms, inhibiting protein synthesis. Exhibiting high tissue distribution and an extended half-life, it offers convenient once-daily short course dosing.',
                'indications' => 'Community-acquired respiratory infections, tonsillitis/pharyngitis, acute exacerbations of chronic obstructive pulmonary disease (COPD), and genital ulcer disease.',
                'directions' => '500 mg orally once daily for 3 consecutive days, taken 1 hour before or 2 hours after food.',
                'precautions' => 'Caution advised in patients with cardiac conduction abnormalities, QT prolongation, or hepatic dysfunction.',
                'storage' => 'Store at controlled room temperature between 15°C and 30°C. Protect from excess humidity.',
                'prescription_type' => 'Rx Only',
                'is_featured' => true,
                'images' => [
                    'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1563213126-a4273aed2016?auto=format&fit=crop&w=800&q=80',
                ],
                'compositions' => [
                    ['ingredient_name' => 'Azithromycin (as Dihydrate)', 'strength' => '500', 'unit' => 'mg'],
                ],
            ],
            [
                'category_slug' => 'antibiotics-and-antimicrobials',
                'brand_name' => 'CeftriApex 1g Injection',
                'generic_name' => 'Ceftriaxone Sodium for Injection IP',
                'product_code' => 'APX-AB-003',
                'dosage_form' => 'Sterile Powder for Injection',
                'strength' => '1000 mg (1 g)',
                'short_description' => 'Third-generation cephalosporin injectable providing extensive antimicrobial coverage for acute hospital care.',
                'description' => 'CeftriApex 1g delivers broad-spectrum bactericidal activity against Gram-positive and Gram-negative pathogens by inhibiting cell wall synthesis. Stable against beta-lactamase degradation with excellent CSF and tissue penetration.',
                'indications' => 'Severe sepsis, meningitis, lower respiratory tract infections, intra-abdominal infections, and perioperative surgical prophylaxis.',
                'directions' => 'Administer via slow intravenous infusion over 30 minutes or deep intramuscular injection after reconstitution with sterile water for injection.',
                'precautions' => 'Contraindicated in neonates with hyperbilirubinemia. Do not mix or co-administer with calcium-containing intravenous solutions.',
                'storage' => 'Store below 25°C protected from light. Reconstituted solutions retain potency for 24 hours at room temperature.',
                'prescription_type' => 'Rx Only',
                'is_featured' => false,
                'images' => [
                    'https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1579165466791-78822d31e0bc?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=800&q=80',
                ],
                'compositions' => [
                    ['ingredient_name' => 'Sterile Ceftriaxone Sodium eq. to Anhydrous Ceftriaxone', 'strength' => '1000', 'unit' => 'mg'],
                ],
            ],
            [
                'category_slug' => 'antibiotics-and-antimicrobials',
                'brand_name' => 'CiproOtic Eye & Ear Drops',
                'generic_name' => 'Ciprofloxacin Ophthalmic / Otic Solution IP',
                'product_code' => 'APX-AB-004',
                'dosage_form' => 'Ophthalmic / Otic Drops',
                'strength' => '0.3% w/v',
                'short_description' => 'Sterile antimicrobial topical drops for ocular and otic bacterial infections.',
                'description' => 'CiproOtic provides high localized concentrations of ciprofloxacin, a fluoroquinolone antimicrobial that targets bacterial DNA gyrase and topoisomerase IV. Formulated with isotonic buffers for optimal ocular tolerance.',
                'indications' => 'Bacterial conjunctivitis, corneal ulcers, and acute otitis externa caused by susceptible bacterial strains.',
                'directions' => 'Instill 1 to 2 drops into affected eye(s) or ear canal every 4 to 6 hours, or as prescribed by a physician.',
                'precautions' => 'For topical ophthalmic or otic use only. Avoid touching the dropper tip to any surface to prevent contamination.',
                'storage' => 'Store between 15°C and 25°C. Discard container 30 days after first opening.',
                'prescription_type' => 'Rx Only',
                'is_featured' => false,
                'images' => [
                    'https://images.unsplash.com/photo-1550572017-edd951aa8f72?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1628771065518-0d82f1938462?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1624454002302-36b824d7bd0a?auto=format&fit=crop&w=800&q=80',
                ],
                'compositions' => [
                    ['ingredient_name' => 'Ciprofloxacin Hydrochloride', 'strength' => '0.3', 'unit' => '% w/v'],
                    ['ingredient_name' => 'Benzalkonium Chloride (Preservative)', 'strength' => '0.01', 'unit' => '% w/v'],
                ],
            ],

            // Cardiovascular & Hypertension
            [
                'category_slug' => 'cardiovascular-and-hypertension',
                'brand_name' => 'TelmiStat 40',
                'generic_name' => 'Telmisartan Tablets IP',
                'product_code' => 'APX-CV-001',
                'dosage_form' => 'Tablet',
                'strength' => '40 mg',
                'short_description' => 'High-affinity angiotensin II receptor blocker delivering stable 24-hour blood pressure regulation.',
                'description' => 'TelmiStat 40 provides potent, selective blockade of angiotensin II AT1 receptors, preventing vascular constriction and aldosterone release. Offers consistent 24-hour blood pressure lowering with proven end-organ cardio-renal protective benefits.',
                'indications' => 'Primary essential hypertension and reduction of cardiovascular morbidity in adult patients.',
                'directions' => '40 mg once daily taken orally with water, with or without meals. Dosage may be titrated to 80 mg daily based on clinical response.',
                'precautions' => 'Contraindicated in pregnancy and severe biliary obstructive disorders. Periodic electrolyte and serum potassium monitoring is recommended.',
                'storage' => 'Keep tablets in original blister packaging to protect from moisture. Store below 25°C.',
                'prescription_type' => 'Rx Only',
                'is_featured' => true,
                'images' => [
                    'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1576073719676-aa955fc6b5a9?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1586015555751-63c258d4a942?auto=format&fit=crop&w=800&q=80',
                ],
                'compositions' => [
                    ['ingredient_name' => 'Telmisartan', 'strength' => '40', 'unit' => 'mg'],
                ],
            ],
            [
                'category_slug' => 'cardiovascular-and-hypertension',
                'brand_name' => 'AtorvaPure 20',
                'generic_name' => 'Atorvastatin Calcium Tablets IP',
                'product_code' => 'APX-CV-002',
                'dosage_form' => 'Film-Coated Tablet',
                'strength' => '20 mg',
                'short_description' => 'Gold-standard statin for LDL-cholesterol lowering and atherosclerotic risk reduction.',
                'description' => 'AtorvaPure 20 is a selective, competitive inhibitor of HMG-CoA reductase, the rate-limiting enzyme that converts HMG-CoA to mevalonate. Rapidly lowers circulating LDL-C, triglycerides, and apolipoprotein B while elevating beneficial HDL levels.',
                'indications' => 'Hypercholesterolemia, combined hyperlipidemia, and secondary prevention of major adverse cardiovascular events.',
                'directions' => 'Initial dosage is 10 mg to 20 mg once daily. Administer as a single dose at any time of day, with or without food.',
                'precautions' => 'Perform baseline liver function assays before initiation. Discontinue if markedly elevated serum CK levels occur or myopathy is suspected.',
                'storage' => 'Store in a dry location at 20°C to 25°C.',
                'prescription_type' => 'Rx Only',
                'is_featured' => false,
                'images' => [
                    'https://images.unsplash.com/photo-1576073719676-aa955fc6b5a9?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
                ],
                'compositions' => [
                    ['ingredient_name' => 'Atorvastatin (as Atorvastatin Calcium)', 'strength' => '20', 'unit' => 'mg'],
                ],
            ],
            [
                'category_slug' => 'cardiovascular-and-hypertension',
                'brand_name' => 'RosuvaGold 10',
                'generic_name' => 'Rosuvastatin Calcium Film-Coated Tablets',
                'product_code' => 'APX-CV-003',
                'dosage_form' => 'Film-Coated Tablet',
                'strength' => '10 mg',
                'short_description' => 'High-intensity statin therapy offering superior LDL reduction and plaque stabilization.',
                'description' => 'RosuvaGold 10 provides robust cardiovascular risk reduction by effectively reducing hepatic synthesis of low-density lipoproteins and stimulating LDL clearance from arterial circulation.',
                'indications' => 'Severe hypercholesterolemia, dyslipidemia, and prevention of cardiovascular events in high-risk patients.',
                'directions' => '10 mg once daily orally at any time of day, with or without food.',
                'precautions' => 'Dose adjustment required in severe renal insufficiency. Avoid excessive alcohol consumption during therapy.',
                'storage' => 'Store in tightly closed container away from excessive heat and direct sunlight below 25°C.',
                'prescription_type' => 'Rx Only',
                'is_featured' => false,
                'images' => [
                    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=800&q=80',
                ],
                'compositions' => [
                    ['ingredient_name' => 'Rosuvastatin (as Rosuvastatin Calcium)', 'strength' => '10', 'unit' => 'mg'],
                ],
            ],

            // Analgesics & Anti-Inflammatory
            [
                'category_slug' => 'analgesics-and-anti-inflammatory',
                'brand_name' => 'ApexPara 650',
                'generic_name' => 'Paracetamol Tablets IP',
                'product_code' => 'APX-AN-001',
                'dosage_form' => 'Tablet',
                'strength' => '650 mg',
                'short_description' => 'Fast-acting antipyretic and analgesic for fever management and relief of mild to moderate pain.',
                'description' => 'ApexPara 650 provides reliable antipyretic action through central hypothalamic thermoregulatory center inhibition and analgesic relief by inhibiting prostaglandin synthesis.',
                'indications' => 'Fever, headache, toothache, musculoskeletal ache, cold/flu discomfort, and postoperative pain relief.',
                'directions' => '1 tablet every 4 to 6 hours as required. Do not exceed 4 tablets in 24 hours without medical supervision.',
                'precautions' => 'Never exceed the recommended dosage. Co-administration with other paracetamol products may cause acute liver failure.',
                'storage' => 'Store below 25°C in a dry place protected from sunlight.',
                'prescription_type' => 'OTC',
                'is_featured' => true,
                'images' => [
                    'https://images.unsplash.com/photo-1550572017-ed2365287f33?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=800&q=80',
                ],
                'compositions' => [
                    ['ingredient_name' => 'Paracetamol', 'strength' => '650', 'unit' => 'mg'],
                ],
            ],
            [
                'category_slug' => 'analgesics-and-anti-inflammatory',
                'brand_name' => 'AcecloPlus SP',
                'generic_name' => 'Aceclofenac, Paracetamol & Serratiopeptidase Tablets',
                'product_code' => 'APX-AN-002',
                'dosage_form' => 'Film-Coated Tablet',
                'strength' => '100 mg / 325 mg / 15 mg',
                'short_description' => 'Triple-action anti-inflammatory, analgesic, and enzyme combination for rapid edema and pain resolution.',
                'description' => 'AcecloPlus SP combines aceclofenac (preferential COX-2 inhibitor), paracetamol (centrally active analgesic), and serratiopeptidase (proteolytic enzyme). Effectively breaks down inflammatory exudates and hastens tissue repair.',
                'indications' => 'Osteoarthritis, rheumatoid arthritis, ankylosing spondylitis, acute musculoskeletal trauma, and post-operative orthopedic inflammation.',
                'directions' => '1 tablet twice daily after meals with an adequate volume of water.',
                'precautions' => 'Contraindicated in active peptic ulceration, gastrointestinal bleeding, or severe renal impairment.',
                'storage' => 'Store in a cool and dry environment protected from light.',
                'prescription_type' => 'Rx Only',
                'is_featured' => false,
                'images' => [
                    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1586015555751-63c258d4a942?auto=format&fit=crop&w=800&q=80',
                ],
                'compositions' => [
                    ['ingredient_name' => 'Aceclofenac', 'strength' => '100', 'unit' => 'mg'],
                    ['ingredient_name' => 'Paracetamol', 'strength' => '325', 'unit' => 'mg'],
                    ['ingredient_name' => 'Serratiopeptidase', 'strength' => '15', 'unit' => 'mg'],
                ],
            ],
            [
                'category_slug' => 'analgesics-and-anti-inflammatory',
                'brand_name' => 'ParaDrop Pediatric',
                'generic_name' => 'Paracetamol Pediatric Oral Drops IP',
                'product_code' => 'APX-AN-003',
                'dosage_form' => 'Pediatric Oral Drops',
                'strength' => '100 mg / ml',
                'short_description' => 'Accurately calibrated pediatric antipyretic drops for infants and toddlers.',
                'description' => 'ParaDrop Pediatric is an alcohol-free, pleasant fruit-flavored oral drop formulation designed for gentle yet effective fever reduction and pain relief in infants and young children following immunization or teething.',
                'indications' => 'Pediatric pyrexia, post-vaccination fever, earache, teething discomfort, and cold symptoms.',
                'directions' => 'Dose strictly according to body weight using the calibrated dropper provided, or as directed by a pediatrician.',
                'precautions' => 'Do not exceed 4 doses in 24 hours. Ensure calibrated dropper is washed and dried after each use.',
                'storage' => 'Store below 25°C away from direct sunlight. Do not freeze.',
                'prescription_type' => 'OTC',
                'is_featured' => false,
                'images' => [
                    'https://images.unsplash.com/photo-1628771065518-0d82f1938462?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1550572017-edd951aa8f72?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1580281657527-47f249e8f4df?auto=format&fit=crop&w=800&q=80',
                ],
                'compositions' => [
                    ['ingredient_name' => 'Paracetamol', 'strength' => '100', 'unit' => 'mg/ml'],
                ],
            ],

            // Gastrointestinal & Hepatology
            [
                'category_slug' => 'gastrointestinal-and-hepatology',
                'brand_name' => 'PantoApex DSR',
                'generic_name' => 'Pantoprazole Gastro-Resistant & Domperidone Sustained-Release Capsules IP',
                'product_code' => 'APX-GI-001',
                'dosage_form' => 'Sustained-Release Capsule',
                'strength' => '40 mg / 30 mg',
                'short_description' => 'Dual-action formula targeting gastric hyperacidity, acid reflux, nausea, and delayed gastric emptying.',
                'description' => 'PantoApex DSR combines pantoprazole (an irreversible H+/K+ ATPase proton pump inhibitor) with domperidone (a peripheral D2 dopamine antagonist). Controls acid secretion while enhancing upper gastrointestinal motility and lower esophageal sphincter pressure.',
                'indications' => 'Gastroesophageal reflux disease (GERD), peptic ulcer disease, functional dyspepsia, and reflux-associated nausea.',
                'directions' => '1 capsule once daily taken in the morning on an empty stomach at least 30 to 60 minutes before breakfast.',
                'precautions' => 'Capsules must be swallowed whole without chewing or crushing. Exercise caution in cardiac arrhythmia patients.',
                'storage' => 'Store in a cool dry place below 25°C. Keep moisture-barrier blister strip intact.',
                'prescription_type' => 'Rx Only',
                'is_featured' => true,
                'images' => [
                    'https://images.unsplash.com/photo-1550572017-edd951aa8f72?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
                ],
                'compositions' => [
                    ['ingredient_name' => 'Pantoprazole Sodium (as Enteric-Coated Pellets)', 'strength' => '40', 'unit' => 'mg'],
                    ['ingredient_name' => 'Domperidone (as Sustained-Release Pellets)', 'strength' => '30', 'unit' => 'mg'],
                ],
            ],
            [
                'category_slug' => 'gastrointestinal-and-hepatology',
                'brand_name' => 'MagalAcid MPS Suspension',
                'generic_name' => 'Magaldrate & Simethicone Oral Suspension IP',
                'product_code' => 'APX-GI-002',
                'dosage_form' => 'Oral Suspension',
                'strength' => '480 mg / 20 mg per 5 ml',
                'short_description' => 'Fast-acting, long-lasting antacid and antiflatulent suspension with cool refreshing mint flavor.',
                'description' => 'MagalAcid MPS provides rapid chemical neutralization of excess gastric acid while simethicone collapses trapped gas bubbles, providing prompt relief from heartburn, acid regurgitation, and abdominal bloating.',
                'indications' => 'Hyperacidity, heartburn, gastritis, flatulent dyspepsia, and supportive therapy for peptic ulcer symptoms.',
                'directions' => '10 ml to 15 ml orally between meals and at bedtime, or when symptoms occur. Shake well before use.',
                'precautions' => 'Caution in patients on low-sodium diets or with severe chronic kidney disease.',
                'storage' => 'Store below 30°C. Protect from freezing. Keep bottle tightly closed.',
                'prescription_type' => 'OTC',
                'is_featured' => false,
                'images' => [
                    'https://images.unsplash.com/photo-1580281657527-47f249e8f4df?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1550572017-edd951aa8f72?auto=format&fit=crop&w=800&q=80',
                ],
                'compositions' => [
                    ['ingredient_name' => 'Magaldrate', 'strength' => '480', 'unit' => 'mg/5ml'],
                    ['ingredient_name' => 'Simethicone', 'strength' => '20', 'unit' => 'mg/5ml'],
                ],
            ],

            // Respiratory & Pulmonology
            [
                'category_slug' => 'respiratory-and-pulmonology',
                'brand_name' => 'Montair-LC',
                'generic_name' => 'Montelukast Sodium & Levocetirizine Dihydrochloride Tablets IP',
                'product_code' => 'APX-RS-001',
                'dosage_form' => 'Film-Coated Tablet',
                'strength' => '10 mg / 5 mg',
                'short_description' => 'Potent dual-mechanism allergy blocker and bronchodilatory therapy for allergic rhinitis and asthma.',
                'description' => 'Montair-LC combines the leukotriene D4 receptor antagonist montelukast with the selective histamine H1 receptor inverse agonist levocetirizine. Effectively relieves rhinorrhea, nasal congestion, sneezing, and associated bronchial hyper-reactivity.',
                'indications' => 'Seasonal and perennial allergic rhinitis, chronic urticaria, and comorbid mild-to-moderate asthma maintenance.',
                'directions' => '1 tablet once daily in the evening, taken with or without food.',
                'precautions' => 'Mild somnolence or dizziness may occur; avoid operating heavy machinery if affected.',
                'storage' => 'Store protected from heat and moisture below 25°C.',
                'prescription_type' => 'Rx Only',
                'is_featured' => false,
                'images' => [
                    'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1550572017-ed2365287f33?auto=format&fit=crop&w=800&q=80',
                ],
                'compositions' => [
                    ['ingredient_name' => 'Montelukast Sodium', 'strength' => '10', 'unit' => 'mg'],
                    ['ingredient_name' => 'Levocetirizine Dihydrochloride', 'strength' => '5', 'unit' => 'mg'],
                ],
            ],
            [
                'category_slug' => 'respiratory-and-pulmonology',
                'brand_name' => 'RespiClear Cough Syrup',
                'generic_name' => 'Ambroxol HCl, Levosalbutamol & Guaiphenesin Syrup',
                'product_code' => 'APX-RS-002',
                'dosage_form' => 'Cough Syrup / Liquid Oral',
                'strength' => '30 mg / 1 mg / 50 mg per 5 ml',
                'short_description' => 'Triple-action mucolytic, bronchodilator, and expectorant syrup for productive cough relief.',
                'description' => 'RespiClear Cough Syrup liquefies viscous bronchial secretions, dilates constricted airways, and facilitates productive expectoration to restore effortless breathing in pulmonary congestion.',
                'indications' => 'Productive wet cough associated with acute bronchitis, bronchial asthma, and chronic obstructive pulmonary diseases.',
                'directions' => '5 ml to 10 ml three times daily for adults, or as directed by a healthcare professional.',
                'precautions' => 'Use with caution in patients with cardiac tachyarrhythmias, hyperthyroidism, or active gastric ulceration.',
                'storage' => 'Store below 25°C in a dry environment. Keep the bottle tightly closed after each use.',
                'prescription_type' => 'Rx Only',
                'is_featured' => true,
                'images' => [
                    'https://images.unsplash.com/photo-1580281657527-47f249e8f4df?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1628771065518-0d82f1938462?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1550572017-edd951aa8f72?auto=format&fit=crop&w=800&q=80',
                ],
                'compositions' => [
                    ['ingredient_name' => 'Ambroxol Hydrochloride', 'strength' => '30', 'unit' => 'mg/5ml'],
                    ['ingredient_name' => 'Levosalbutamol Sulphate', 'strength' => '1', 'unit' => 'mg/5ml'],
                    ['ingredient_name' => 'Guaiphenesin', 'strength' => '50', 'unit' => 'mg/5ml'],
                ],
            ],
            [
                'category_slug' => 'respiratory-and-pulmonology',
                'brand_name' => 'AeroBreathe 200 Inhaler',
                'generic_name' => 'Budesonide & Formoterol Fumarate Inhalation Aerosol',
                'product_code' => 'APX-RS-003',
                'dosage_form' => 'Metered Dose Inhaler',
                'strength' => '200 mcg / 6 mcg per actuation',
                'short_description' => 'Synergistic corticosteroid and long-acting beta2-agonist combination inhaler for asthma and COPD control.',
                'description' => 'AeroBreathe 200 Inhaler combines budesonide (potent anti-inflammatory corticosteroid) with formoterol (rapid-onset long-acting bronchodilator) delivering targeted pulmonary relief with minimal systemic exposure.',
                'indications' => 'Regular maintenance therapy for moderate-to-severe persistent asthma and symptomatic management of severe COPD.',
                'directions' => '1 to 2 inhalations twice daily. Rinse mouth thoroughly with water after inhalation to prevent oral candidiasis.',
                'precautions' => 'Not intended for immediate relief of acute bronchospasm. Regular canister cleaning recommended.',
                'storage' => 'Pressurized canister. Store below 30°C. Protect from direct sunlight and do not puncture or incinerate.',
                'prescription_type' => 'Rx Only',
                'is_featured' => false,
                'images' => [
                    'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=800&q=80',
                ],
                'compositions' => [
                    ['ingredient_name' => 'Budesonide IP', 'strength' => '200', 'unit' => 'mcg'],
                    ['ingredient_name' => 'Formoterol Fumarate Dihydrate IP', 'strength' => '6', 'unit' => 'mcg'],
                ],
            ],

            // Nutraceuticals & Multivitamins
            [
                'category_slug' => 'nutraceuticals-and-multivitamins',
                'brand_name' => 'ApexVit Gold',
                'generic_name' => 'Multivitamin, Multimineral, Zinc & Antioxidant Softgels',
                'product_code' => 'APX-NT-001',
                'dosage_form' => 'Softgel Capsule',
                'strength' => 'Advanced Daily Micronutrient Profile',
                'short_description' => 'Complete daily vitality formula packed with essential vitamins, organic zinc, and cellular antioxidants.',
                'description' => 'ApexVit Gold delivers therapeutic micronutrient replenishment to reinforce natural immunity, reduce physical fatigue, enhance cognitive alertness, and protect cells against oxidative cellular damage.',
                'indications' => 'Nutritional deficiencies, recovery following illness, physical exhaustion, immune support, and metabolic wellness.',
                'directions' => '1 softgel capsule daily with water after the main meal.',
                'precautions' => 'Dietary supplement. Keep out of reach of children. Do not exceed the suggested daily dose.',
                'storage' => 'Store in a cool, dry place away from direct sunlight.',
                'prescription_type' => 'OTC',
                'is_featured' => true,
                'images' => [
                    'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1550572017-ed2365287f33?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1563213126-a4273aed2016?auto=format&fit=crop&w=800&q=80',
                ],
                'compositions' => [
                    ['ingredient_name' => 'Vitamin C (Ascorbic Acid)', 'strength' => '50', 'unit' => 'mg'],
                    ['ingredient_name' => 'Zinc Sulphate Monohydrate', 'strength' => '22.5', 'unit' => 'mg'],
                    ['ingredient_name' => 'Vitamin D3 (Cholecalciferol)', 'strength' => '1000', 'unit' => 'IU'],
                    ['ingredient_name' => 'Vitamin B12 (Cyanocobalamin)', 'strength' => '15', 'unit' => 'mcg'],
                    ['ingredient_name' => 'Niacinamide (Vitamin B3)', 'strength' => '25', 'unit' => 'mg'],
                ],
            ],
            [
                'category_slug' => 'nutraceuticals-and-multivitamins',
                'brand_name' => 'CalciBone D3 Chewables',
                'generic_name' => 'Calcium Carbonate & Vitamin D3 Chewable Tablets IP',
                'product_code' => 'APX-NT-002',
                'dosage_form' => 'Chewable Tablet',
                'strength' => '500 mg / 400 IU',
                'short_description' => 'Delicious orange-flavored chewable tablets for optimum bone mineral density and calcium balance.',
                'description' => 'CalciBone D3 provides bioavailable elemental calcium paired with cholecalciferol (vitamin D3) to maximize intestinal absorption, reinforce skeletal integrity, and mitigate age-associated osteopenia.',
                'indications' => 'Osteoporosis, osteomalacia, calcium deficiency states, pregnancy, and post-menopausal bone support.',
                'directions' => '1 chewable tablet twice daily after meals, thoroughly chewed before swallowing.',
                'precautions' => 'Contraindicated in hypercalcemia, hypercalciuria, or calcium renal calculi.',
                'storage' => 'Store in a moisture-tight container below 25°C. Keep protected from moisture and light.',
                'prescription_type' => 'OTC',
                'is_featured' => false,
                'images' => [
                    'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=800&q=80',
                ],
                'compositions' => [
                    ['ingredient_name' => 'Elemental Calcium (from Calcium Carbonate)', 'strength' => '500', 'unit' => 'mg'],
                    ['ingredient_name' => 'Vitamin D3 (Cholecalciferol)', 'strength' => '400', 'unit' => 'IU'],
                ],
            ],
        ];

        foreach ($productsData as $prodData) {
            $category = Category::where('slug', $prodData['category_slug'])->first();
            if (! $category) {
                continue;
            }

            $slug = Str::slug($prodData['brand_name']);

            $product = Product::updateOrCreate(
                ['product_code' => $prodData['product_code']],
                [
                    'category_id' => $category->id,
                    'brand_name' => $prodData['brand_name'],
                    'generic_name' => $prodData['generic_name'],
                    'slug' => $slug,
                    'dosage_form' => $prodData['dosage_form'],
                    'strength' => $prodData['strength'],
                    'short_description' => $prodData['short_description'],
                    'description' => $prodData['description'],
                    'indications' => $prodData['indications'],
                    'directions' => $prodData['directions'],
                    'precautions' => $prodData['precautions'],
                    'storage' => $prodData['storage'],
                    'prescription_type' => $prodData['prescription_type'],
                    'status' => ProductStatus::ACTIVE,
                    'is_featured' => $prodData['is_featured'],
                    'created_by' => $adminId,
                    'updated_by' => $adminId,
                ]
            );

            // Seed active compositions
            $product->compositions()->delete();
            foreach ($prodData['compositions'] as $composition) {
                $product->compositions()->create($composition);
            }

            // Seed multiple images with sort order
            $product->images()->delete();
            $imagesList = $prodData['images'] ?? (isset($prodData['image_url']) ? [$prodData['image_url']] : []);
            foreach ($imagesList as $index => $imageUrl) {
                $product->images()->create([
                    'collection' => 'product-image',
                    'file_name' => basename(parse_url($imageUrl, PHP_URL_PATH) ?? 'product.jpg'),
                    'file_path' => $imageUrl,
                    'mime_type' => 'image/jpeg',
                    'disk' => 'public',
                    'size' => 125000,
                    'alt_text' => $prodData['brand_name'].' - View '.($index + 1),
                    'sort_order' => $index,
                ]);
            }
        }
    }
}
