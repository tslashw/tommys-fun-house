/**
 * Central list of projects/games shown across the site.
 * Add a new entry here and it appears in the Arcade grid automatically.
 *
 * @typedef {Object} Game
 * @property {string} href     Link to the project (relative or absolute)
 * @property {string} title    Display name
 * @property {string} blurb    One-line description
 * @property {('desktop'|'mobile')[]} devices  Supported devices
 */

/** @type {Game[]} */
export const games = [
    {
        href: '/blackjack-tycoon/',
        title: 'Blackjack Tycoon',
        blurb: 'A PvE blackjack game. Work in progress.',
        devices: ['desktop'],
    },
    {
        href: '/flag-guru/',
        title: 'Flag Guru',
        blurb: 'Test your flag knowledge in a quickfire quiz.',
        devices: ['desktop', 'mobile'],
    },
];
