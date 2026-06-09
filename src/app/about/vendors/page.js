import Image from "next/image";
import { Phone, Mail, Globe, Instagram, MapPin } from "lucide-react";

export const metadata = {
  title: "Preferred Vendors | House of the Redeemer",
  description:
    "Explore our list of preferred vendors for catering and event services at the House of the Redeemer.",
};

export const revalidate = 86400;

async function getVendors() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

  const query = `*[_type == "preferredVendor"] | order(order asc, name asc) {
    _id,
    name,
    address,
    phone,
    email,
    website,
    instagramUrl,
    instagramHandle
  }`;

  const url = `https://${projectId}.apicdn.sanity.io/v2023-10-10/data/query/${dataset}?query=${encodeURIComponent(query)}`;

  const res = await fetch(url, {
    next: { revalidate: 86400, tags: ["sanity"] },
  });

  if (!res.ok) throw new Error(`Sanity fetch failed: ${res.status}`);
  const { result } = await res.json();
  return result || [];
}

export default async function PreferredVendorsPage() {
  const vendors = await getVendors();

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[400px] md:h-[750px] overflow-hidden">
        <Image
          src="/Courtyard_w_tables.jpg"
          alt="Preferred Vendors - House of the Redeemer"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/50 flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full flex justify-center items-center">
            <div className="max-w-2xl text-white">
              <h1 className="font-serif text-4xl md:text-5xl font-medium mb-4 tracking-wide flex justify-center">
                Preferred Vendors
              </h1>
              <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                The House works with preferred vendors for catering and staffing
                to ensure the highest quality service for your events.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Introduction Section */}
      <div className="bg-slate-50 py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-lg text-slate-700 leading-relaxed">
            For event catering at the House of the Redeemer, we recommend
            working with our trusted preferred vendors. These partners have
            extensive experience with our venue and consistently deliver
            exceptional service.
          </p>
        </div>
      </div>

      {/* Vendors Section */}
      <div className="bg-[#fbf9f7] py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-serif text-3xl font-medium text-[#6b2f2a] mb-10 pb-3 border-b-2 border-slate-200 text-center">
            Our Preferred Catering Partners
          </h2>

          <div className="space-y-8">
            {vendors.map((vendor) => (
              <div
                key={vendor._id}
                className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow"
              >
                <h3 className="font-serif text-2xl font-medium text-[#6b2f2a] mb-6">
                  {vendor.name}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    {vendor.address && (
                      <div className="flex items-start">
                        <div className="w-10 h-10 bg-[#6b2f2a]/10 rounded-full flex items-center justify-center flex-shrink-0 mr-3">
                          <MapPin className="w-5 h-5 text-[#6b2f2a]" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900 mb-1">
                            Address
                          </p>
                          <p className="text-slate-600">{vendor.address}</p>
                        </div>
                      </div>
                    )}

                    {vendor.phone && (
                      <div className="flex items-start">
                        <div className="w-10 h-10 bg-[#6b2f2a]/10 rounded-full flex items-center justify-center flex-shrink-0 mr-3">
                          <Phone className="w-5 h-5 text-[#6b2f2a]" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900 mb-1">
                            Phone
                          </p>
                          <a
                            href={`tel:${vendor.phone.replace(/[^0-9]/g, "")}`}
                            className="text-[#6b2f2a] hover:text-[#4e1f1a] hover:underline"
                          >
                            {vendor.phone}
                          </a>
                        </div>
                      </div>
                    )}

                    {vendor.email && (
                      <div className="flex items-start">
                        <div className="w-10 h-10 bg-[#6b2f2a]/10 rounded-full flex items-center justify-center flex-shrink-0 mr-3">
                          <Mail className="w-5 h-5 text-[#6b2f2a]" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900 mb-1">
                            Email
                          </p>
                          <a
                            href={`mailto:${vendor.email}`}
                            className="text-[#6b2f2a] hover:text-[#4e1f1a] hover:underline break-all"
                          >
                            {vendor.email}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    {vendor.website && (
                      <div className="flex items-start">
                        <div className="w-10 h-10 bg-[#6b2f2a]/10 rounded-full flex items-center justify-center flex-shrink-0 mr-3">
                          <Globe className="w-5 h-5 text-[#6b2f2a]" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900 mb-1">
                            Website
                          </p>
                          <a
                            href={vendor.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#6b2f2a] hover:text-[#4e1f1a] hover:underline break-all"
                          >
                            {vendor.website.replace(/^https?:\/\//, "")}
                          </a>
                        </div>
                      </div>
                    )}

                    {vendor.instagramUrl && (
                      <div className="flex items-start">
                        <div className="w-10 h-10 bg-[#6b2f2a]/10 rounded-full flex items-center justify-center flex-shrink-0 mr-3">
                          <Instagram className="w-5 h-5 text-[#6b2f2a]" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900 mb-1">
                            Instagram
                          </p>
                          <a
                            href={vendor.instagramUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#6b2f2a] hover:text-[#4e1f1a] hover:underline"
                          >
                            {vendor.instagramHandle || vendor.instagramUrl}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Information Section */}
      <div className="bg-slate-50 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="font-serif text-2xl font-medium text-[#6b2f2a] mb-4 text-center">
              Planning Your Event?
            </h3>
            <p className="text-slate-600 text-center mb-6">
              When planning your event at the House of the Redeemer, we
              encourage you to reach out to our preferred vendors for catering
              services. They are familiar with our space and can help make your
              event truly memorable.
            </p>
            <p className="text-sm text-slate-500 text-center">
              For questions about vendor requirements or to discuss your event
              needs, please contact our office.
            </p>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="bg-[#fbf9f7] py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="font-serif text-2xl font-medium text-[#6b2f2a] mb-4">
            Have Questions About Planning Your Event?
          </h3>
          <p className="text-slate-600 mb-6">
            Our team is here to help you coordinate with our preferred vendors
            and ensure your event runs smoothly.
          </p>
          <a
            href="/contact"
            className="inline-block bg-[#6b2f2a] hover:bg-[#4e1f1a] text-white font-medium py-3 px-8 rounded-md transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </main>
  );
}
