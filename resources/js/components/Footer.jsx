// Footer component with 100% dynamic company data and database categories
import { Link } from '@inertiajs/react';
import { ShieldCheck, Mail, Phone, MapPin, Globe, Clock, Building } from 'lucide-react';
import Container from './common/Container';

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer({ companyData, categories = [], onOpenEnquiryModal }) {
  const companyName = companyData?.company_name || companyData?.name || '';
  const legalName = companyData?.legal_name || companyData?.legalName || companyName;
  const description = companyData?.description || '';
  const headquarters = companyData?.headquarters_address || companyData?.headquarters || '';
  const city = companyData?.city || '';
  const state = companyData?.state || '';
  const country = companyData?.country || '';
  const manufacturingUnit = companyData?.manufacturing_unit_address || companyData?.manufacturingUnit || '';
  const phone = companyData?.company_phone || companyData?.phone || '';
  const email = companyData?.enquiries_email || companyData?.enquiriesEmail || companyData?.company_email || companyData?.email || '';
  const hours = companyData?.business_hours || companyData?.businessHours || '';
  const drugLicenseNo = companyData?.drug_license_no || companyData?.drugLicenseNo || '';
  const gstTaxId = companyData?.gst_tax_id || companyData?.gstTaxId || '';
  const isoCert = companyData?.iso_certification || companyData?.isoCertification || '';
  const linkedinUrl = companyData?.linkedin_url || companyData?.linkedin || '';
  const twitterUrl = companyData?.twitter_url || companyData?.twitter || '';
  const websiteUrl = companyData?.website_url || companyData?.website || '';
  const logoUrl = companyData?.logo_url || companyData?.logoUrl;

  const fullAddress = [headquarters, city, state, country].filter(Boolean).join(', ');

  const complianceLinks = [
    { name: 'Quality by Design (QbD)', href: '#quality' },
    { name: 'WHO-GMP Compliance', href: '#quality' },
    { name: 'Formulation R&D Studies', href: '#rd' },
    { name: 'Pharmacovigilance & Safety', href: '#contact' },
    { name: 'Technical Dossiers & CTD', href: '#contact' },
  ];

  return (
    <footer className="bg-slate-50 text-slate-600 border-t border-slate-200">
      <div className="py-12 sm:py-16">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
            <div className="lg:col-span-2 space-y-4">
              <a href="#home" className="flex items-center gap-3 group">
                {logoUrl ? (
                  <div className="h-10 flex items-center">
                    <img 
                      src={logoUrl} 
                      alt={companyName} 
                      className="h-9 w-auto max-w-[170px] object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-xs">
                    <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
                  </div>
                )}
                <div className="flex flex-col">
                  {companyName && (
                    <span className="text-lg font-bold tracking-tight text-slate-900 leading-none">
                      {companyName}
                    </span>
                  )}
                  {legalName && (
                    <span className="text-[10px] uppercase tracking-widest font-semibold text-teal-700 mt-1">
                      {legalName}
                    </span>
                  )}
                </div>
              </a>

              {description && (
                <p className="text-xs text-slate-600 leading-relaxed max-w-sm">
                  {description}
                </p>
              )}

              {(isoCert || drugLicenseNo || gstTaxId) && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {isoCert && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium bg-white border border-slate-200 text-slate-700">
                      <ShieldCheck className="w-3 h-3 text-teal-600" />
                      {isoCert}
                    </span>
                  )}
                  {drugLicenseNo && (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-mono bg-white border border-slate-200 text-slate-600">
                      DL: {drugLicenseNo}
                    </span>
                  )}
                  {gstTaxId && (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-mono bg-white border border-slate-200 text-slate-600">
                      GST: {gstTaxId}
                    </span>
                  )}
                </div>
              )}

              {(linkedinUrl || twitterUrl || websiteUrl) && (
                <div className="pt-2 flex items-center gap-2.5">
                  {linkedinUrl && (
                    <a
                      href={linkedinUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="LinkedIn"
                      className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-teal-700 hover:border-teal-300 hover:bg-teal-50/50 transition-colors shadow-2xs"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.76v8.37H6.46V10.9M7.84 6.64a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2" />
                      </svg>
                    </a>
                  )}

                  {twitterUrl && (
                    <a
                      href={twitterUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Twitter / X"
                      className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-teal-700 hover:border-teal-300 hover:bg-teal-50/50 transition-colors shadow-2xs"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                  )}

                  {websiteUrl && (
                    <a
                      href={websiteUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Corporate Website"
                      className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-teal-700 hover:border-teal-300 hover:bg-teal-50/50 transition-colors shadow-2xs"
                    >
                      <Globe className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              )}
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
                Formulations
              </h4>
              <ul className="space-y-2 text-xs">
                {categories && categories.length > 0 ? (
                  categories.slice(0, 6).map((cat) => (
                    <li key={cat.id || cat.slug || cat.name}>
                      <Link href={`/products?category=${encodeURIComponent(cat.name)}`} className="text-slate-600 hover:text-teal-700 transition-colors">
                        {cat.name}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li>
                    <Link href="/products" className="text-slate-600 hover:text-teal-700 transition-colors">
                      Product Formulations
                    </Link>
                  </li>
                )}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
                Quality & Compliance
              </h4>
              <ul className="space-y-2 text-xs">
                {complianceLinks.map((item) => (
                  <li key={item.name}>
                    <a href={item.href} className="text-slate-600 hover:text-teal-700 transition-colors">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
                Facilities & Contact
              </h4>
              <div className="space-y-2.5 text-xs text-slate-600">
                {fullAddress && (
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                    <span className="leading-snug">{fullAddress}</span>
                  </div>
                )}

                {manufacturingUnit && (
                  <div className="flex items-start gap-2">
                    <Building className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                    <span className="leading-snug text-slate-500">
                      Plant: {manufacturingUnit}
                    </span>
                  </div>
                )}

                {phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <a href={`tel:${phone.replace(/\s+/g, '')}`} className="hover:text-teal-700 font-medium">
                      {phone}
                    </a>
                  </div>
                )}

                {email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <a href={`mailto:${email}`} className="hover:text-teal-700 font-medium">
                      {email}
                    </a>
                  </div>
                )}

                {hours && (
                  <div className="flex items-center gap-2 text-slate-500">
                    <Clock className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>{hours}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </div>

      <div className="bg-white border-t border-slate-200/80 py-4 text-xs text-slate-500">
        <Container>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div>
              © {CURRENT_YEAR} {legalName || companyName || 'Pharmaceutical Enterprise'}. All rights reserved.
            </div>

            <div className="flex items-center gap-4 text-[11px]">
              <a href="#about" className="hover:text-teal-700 transition-colors">Quality Policy</a>
              <span className="text-slate-300">•</span>
              <a href="#about" className="hover:text-teal-700 transition-colors">Institutional Supply</a>
              <span className="text-slate-300">•</span>
              <a href="#contact" className="hover:text-teal-700 transition-colors">Regulatory Compliance</a>
              <span className="text-slate-300">•</span>
              <Link href="/login" className="text-slate-500 hover:text-teal-700 transition-colors font-medium">
                Admin Login →
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
