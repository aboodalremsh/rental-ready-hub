/**
 * @typedef {'apartment' | 'office' | 'studio' | 'penthouse' | 'commercial'} PropertyType
 */

/**
 * @typedef {'available' | 'rented' | 'maintenance'} PropertyStatus
 */

/**
 * @typedef {'pending' | 'approved' | 'rejected' | 'completed'} RentalStatus
 */

/**
 * @typedef {Object} Property
 * @property {string} id
 * @property {string} title
 * @property {string|null} description
 * @property {PropertyType} property_type
 * @property {PropertyStatus} status
 * @property {number} price
 * @property {number|null} bedrooms
 * @property {number|null} bathrooms
 * @property {number|null} area_sqft
 * @property {string} address
 * @property {string} city
 * @property {string|null} state
 * @property {string|null} zip_code
 * @property {string|null} country
 * @property {number|null} latitude
 * @property {number|null} longitude
 * @property {string[]|null} amenities
 * @property {string[]|null} images
 * @property {boolean|null} featured
 * @property {string} created_at
 * @property {string} updated_at
 */

/**
 * @typedef {Object} Rental
 * @property {string} id
 * @property {string} property_id
 * @property {string} user_id
 * @property {string} start_date
 * @property {string} end_date
 * @property {RentalStatus} status
 * @property {number|null} total_amount
 * @property {string|null} notes
 * @property {string} created_at
 * @property {string} updated_at
 */

/**
 * @typedef {Object} ContactMessage
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string|null} phone
 * @property {string|null} subject
 * @property {string} message
 * @property {string} created_at
 */

export {};
