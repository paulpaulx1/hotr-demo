import Image from 'next/image';
import { Building2 } from 'lucide-react';
import { Church } from 'lucide-react';
import { UtensilsCrossed } from 'lucide-react';

export default function Neighborhood() {
  const museums = [
    { name: 'El Museo del Barrio', url: 'https://www.elmuseo.org' },
    { name: 'Museum of the City of New York', url: 'https://www.mcny.org' },
    { name: 'The Jewish Museum', url: 'https://thejewishmuseum.org' },
    {
      name: 'Cooper Hewitt, Smithsonian Design Museum',
      url: 'https://www.cooperhewitt.org',
    },
    { name: 'Solomon R. Guggenheim Museum', url: 'https://www.guggenheim.org' },
    { name: 'Neue Galerie New York', url: 'https://www.neuegalerie.org' },
    {
      name: 'The Metropolitan Museum of Art',
      url: 'https://www.metmuseum.org',
    },
  ];

  const worship = [
    {
      name: 'Church of the Heavenly Rest',
      type: 'Episcopal',
      url: 'https://churchoftheheavenlyrest.org',
    },
    {
      name: "St. James' Church",
      type: 'Episcopal',
      url: 'https://stjames.org',
    },
    {
      name: 'Cathedral of St. John the Divine',
      type: 'Episcopal',
      url: 'https://www.stjohndivine.org',
    },
    {
      name: 'St. Ignatius Loyola',
      type: 'Catholic',
      url: 'https://www.saintignatiusloyola.org',
    },
    {
      name: 'Christ Church Anglican NYC',
      type: 'Anglican',
      url: 'https://christchurchnyc.com',
    },
    { name: 'Park Avenue Synagogue', type: 'Jewish', url: 'https://pasyn.org' },
    {
      name: 'Islamic Cultural Center of New York',
      type: 'Muslim',
      url: 'https://icc-ny.us',
    },
    {
      name: 'Zen Buddhist Temple',
      type: 'Buddhist',
      url: 'https://zenstudies.org/zen-center-of-new-york-city/',
    },
  ];

  const restaurants = [
    {
      name: 'Bluestone Lane',
      type: 'Café',
      url: 'https://bluestonelane.com/cafes/86th-street-upper-east-side/',
    },
    { name: 'Da Capo', type: 'Italian', url: 'https://dacaponyc.com' },
    {
      name: 'Daily Provisions',
      type: 'Coffee & Sandwiches',
      url: 'https://www.dailyprovisionsnyc.com',
    },
    { name: 'Island', type: 'Americana', url: 'https://www.islandnyc.com' },
    {
      name: 'Pascalou',
      type: 'French',
      url: 'https://www.pascalourestaurant.com',
    },
    { name: "Paola's Osteria", type: 'Italian', url: 'https://paolasnyc.com' },
    {
      name: "Table d'Hote",
      type: 'French Bistro',
      url: 'https://www.tabledhote.com',
    },
    { name: 'Yura', type: 'Café', url: 'https://www.yuranyc.com' },
  ];

  return (
    <section
      id='neighborhood'
      className='bg-slate-50 border-t border-slate-200 py-20 mt-[70]'
    >
      <div className='max-w-6xl mx-auto px-6'>
        <div className='mb-12 text-center'>
          <h2 className='font-serif text-3xl md:text-4xl text-slate-900 mb-4'>
            Carnegie Hill Neighborhood
          </h2>
          <p className='text-lg text-slate-600 max-w-3xl mx-auto'>
            Located in the historic Carnegie Hill District on the Upper East
            Side of Manhattan, the House is on &quot;Museum Mile,&quot; within
            walking distance of major museums, cultural institutions, and near{' '}
            <a
              href='https://www.centralparknyc.org'
              target='_blank'
              rel='noopener noreferrer'
              className='text-[#6b2f2a] hover:underline'
            >
              Central Park
            </a>
            .
          </p>
        </div>

        {/* Museums Section */}
        <div className='mb-16'>
          <div className='bg-[#fbf9f7] rounded-lg shadow-lg p-8 md:p-12'>
            <h3 className='font-serif text-2xl font-medium text-[#6b2f2a] mb-8 pb-3 border-b-2 border-slate-200 flex items-center'>
              <Building2 className='w-6 h-6 mr-3' />
              Museums
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              {museums.map((museum, index) => (
                <a
                  key={index}
                  href={museum.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='bg-white p-4 rounded-md shadow-sm border border-slate-200 hover:border-[#6b2f2a] hover:shadow-md transition-all group'
                >
                  <p className='font-medium text-slate-900 group-hover:text-[#6b2f2a] transition-colors'>
                    {museum.name}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Places of Worship Section */}
        <div className='mb-16'>
          <div className='bg-[#fbf9f7] rounded-lg shadow-lg p-8 md:p-12'>
            <h3 className='font-serif text-2xl font-medium text-[#6b2f2a] mb-8 pb-3 border-b-2 border-slate-200 flex items-center'>
              <Church className='w-6 h-6 mr-3' />
              Churches, Synagogues, Mosques, and Temples
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {worship.map((place, index) => (
                <a
                  key={index}
                  href={place.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='bg-slate-50 p-5 rounded-md shadow-sm border border-slate-200 hover:border-[#6b2f2a] hover:shadow-md transition-all group'
                >
                  <h4 className='font-medium text-slate-900 text-lg mb-1 group-hover:text-[#6b2f2a] transition-colors'>
                    {place.name}
                  </h4>
                  <p className='text-slate-600 text-sm'>{place.type}</p>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Restaurants Section */}
        <div>
          <div className='bg-[#fbf9f7] rounded-lg shadow-lg p-8 md:p-12'>
            <h3 className='font-serif text-2xl font-medium text-[#6b2f2a] mb-8 pb-3 border-b-2 border-slate-200 flex items-center'>
              <UtensilsCrossed className='w-6 h-6 mr-3' />
              Neighborhood Restaurants
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              {restaurants.map((restaurant, index) => (
                <a
                  key={index}
                  href={restaurant.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='bg-white p-5 rounded-md shadow-sm border border-slate-200 hover:border-[#6b2f2a] hover:shadow-md transition-all group'
                >
                  <h4 className='font-medium text-slate-900 mb-1 group-hover:text-[#6b2f2a] transition-colors'>
                    {restaurant.name}
                  </h4>
                  <p className='text-slate-600 text-sm'>{restaurant.type}</p>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Closing Statement */}
        <div className='mt-12 text-center'>
          <p className='text-slate-600 text-lg max-w-3xl mx-auto'>
            Within this serene neighborhood, the House of the Redeemer continues
            to offer its mission of quiet hospitality — a &quot;place
            apart&quot; where heritage, faith, and the rhythms of city life
            meet.
          </p>
        </div>
      </div>
    </section>
  );
}
