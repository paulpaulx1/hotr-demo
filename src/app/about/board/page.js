import Image from "next/image";

export const revalidate = 3600;

async function getBoardData() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

  const query = encodeURIComponent(`
    *[_type == "boardAndStaffPage"][0]{
      "trustees": trustees[]->{
        name,
        role,
        "photoUrl": photo.asset->url + "?w=600&h=600&fit=crop&auto=format"
      },
      "trusteesEmeritus": trusteesEmeritus[]->{
        name,
        role,
        "photoUrl": photo.asset->url + "?w=600&h=600&fit=crop&auto=format"
      },
      "staff": staff[]->{
        name,
        role,
        email,
        "photoUrl": photo.asset->url + "?w=600&h=600&fit=crop&auto=format"
      }
    }
  `);

  const res = await fetch(
    `https://${projectId}.apicdn.sanity.io/v2023-10-10/data/query/${dataset}?query=${query}`,
    { next: { revalidate: 3600, tags: ["sanity"] } }
  );

  if (!res.ok) throw new Error(`Failed to fetch board data: ${res.status}`);
  const { result } = await res.json();
  return result || {};
}

export const metadata = {
  title: "Board of Trustees & Staff | House of the Redeemer",
  description:
    "Meet the Board of Trustees and Staff of the House of the Redeemer who guide our mission and operations.",
};

// 🔠 Helper: sort by last name
function sortByLastName(a, b) {
  const lastA = (a.name || "").trim().split(" ").slice(-1)[0];
  const lastB = (b.name || "").trim().split(" ").slice(-1)[0];
  return lastA.localeCompare(lastB);
}

// 🎚 Helper: officers by role priority, then last name
function sortOfficersByRoleAndLastName(a, b) {
  const roleOrder = {
    President: 1,
    "Vice President": 2,
    Treasurer: 3,
    Secretary: 4,
  };

  const rankA =
    a.role && roleOrder[a.role] !== undefined ? roleOrder[a.role] : 999;
  const rankB =
    b.role && roleOrder[b.role] !== undefined ? roleOrder[b.role] : 999;

  // First by role priority
  if (rankA !== rankB) return rankA - rankB;

  // Then by last name within the same role
  return sortByLastName(a, b);
}

export default async function BoardPage() {
  const {
    trustees = [],
    trusteesEmeritus = [],
    staff = [],
  } = (await getBoardData()) || {};

  // 🧑‍💼 Officers = trustees with a role, sorted by role priority then last name
  const officers = trustees
    .filter((t) => t.role)
    .slice()
    .sort(sortOfficersByRoleAndLastName);

  // 👥 Members = trustees with no role, sorted by last name
  const members = trustees
    .filter((t) => !t.role)
    .slice()
    .sort(sortByLastName);

  // 🎓 Trustees Emeritus sorted by last name
  const emeritusSorted = trusteesEmeritus.slice().sort(sortByLastName);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="relative h-[400px] md:h-[750px] overflow-hidden bg-black">
        <Image
          src="/board-hero.jpg"
          alt="Board of Trustees & Staff - House of the Redeemer"
          fill
          className="object-cover object-center opacity-90"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/50 flex items-center">
          <div className="max-w-7xl mx-auto px-6 text-center text-white">
            <h1 className="font-serif text-4xl md:text-5xl font-medium mb-4">
              Staff & Board of Trustees
            </h1>
          </div>
        </div>
      </div>

      {/* Staff */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-[#fbf9f7] rounded-lg shadow-lg p-8 md:p-12">
            <h2 className="font-serif text-3xl font-medium text-[#6b2f2a] mb-8 border-b-2 border-slate-200 pb-3 text-center">
              Staff
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {staff.map((m) => (
                <div
                  key={m.name}
                  className="bg-white p-6 rounded-md shadow-sm border border-slate-200 hover:border-[#6b2f2a] transition-colors text-center"
                >
                  {m.photoUrl ? (
                    <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-4">
                      <Image
                        src={m.photoUrl}
                        alt={m.name}
                        width={64}
                        height={64}
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 bg-[#6b2f2a] rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                  )}

                  <h4 className="font-medium text-slate-900 text-lg mb-1">
                    {m.name}
                  </h4>
                  {m.role && (
                    <p className="text-[#6b2f2a] text-sm font-medium mb-2">
                      {m.role}
                    </p>
                  )}
                  {m.email && (
                    <a
                      href={`mailto:${m.email}`}
                      className="text-sm text-slate-600 hover:text-[#6b2f2a] underline transition-colors"
                    >
                      {m.email}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trustees (Officers + Members) */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-[#fbf9f7] rounded-lg shadow-lg p-8 md:p-12">
            <h2 className="font-serif text-3xl font-medium text-[#6b2f2a] mb-8 border-b-2 border-slate-200 pb-3 text-center">
              Board of Trustees
            </h2>

            {/* Officers */}
            {officers.length > 0 && (
              <div className="mb-10">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  Officers
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {officers.map((t) => (
                    <div
                      key={t.name}
                      className="bg-white p-5 rounded-md shadow-sm border border-slate-200 hover:border-[#6b2f2a] transition-colors"
                    >
                      <h4 className="font-medium text-slate-900 text-lg mb-1">
                        {t.name}
                      </h4>
                      {t.role && (
                        <p className="text-[#6b2f2a] text-sm font-medium">
                          {t.role}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Members */}
            {members.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  Members
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {members.map((t) => (
                    <div
                      key={t.name}
                      className="bg-white p-4 rounded-md shadow-sm border border-slate-200 hover:border-[#6b2f2a] transition-colors"
                    >
                      <p className="font-medium text-slate-900">{t.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Trustees Emeritus */}
      {emeritusSorted.length > 0 && (
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="bg-[#fbf9f7] rounded-lg shadow-lg p-8 md:p-12">
              <h2 className="font-serif text-3xl font-medium text-[#6b2f2a] mb-8 border-b-2 border-slate-200 pb-3 text-center">
                Trustees Emeritus
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {emeritusSorted.map((t) => (
                  <div
                    key={t.name}
                    className="bg-white p-5 rounded-md shadow-sm border border-slate-200 hover:border-[#6b2f2a] transition-colors"
                  >
                    <h4 className="font-medium text-slate-900 text-lg mb-1">
                      {t.name}
                    </h4>
                    {t.role && (
                      <p className="text-slate-600 text-sm">{t.role}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contact CTA */}
      <section className="bg-[#fbf9f7] py-16 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h3 className="font-serif text-2xl font-medium text-[#6b2f2a] mb-4">
            Get in Touch
          </h3>
          <p className="text-slate-600 mb-6">
            Have questions or want to learn more about supporting our mission?
            We&apos;d love to hear from you.
          </p>
          <a
            href="/contact"
            className="inline-block bg-[#6b2f2a] hover:bg-[#4e1f1a] text-white font-medium py-3 px-8 rounded-md transition-colors"
          >
            Contact Us
          </a>
        </div>
      </section>
    </main>
  );
}
