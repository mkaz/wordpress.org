/**
 * Internal dependencies
 */
import apiPatterns from './fixtures/patterns';
import { getPatternsByQuery } from '../resolvers';

describe( 'getPatternsByQuery', () => {
	it( 'yields with the requested patterns', async () => {
		const generator = getPatternsByQuery( {} );

		expect( generator.next().value ).toEqual( {
			type: 'FETCH_BLOCK_PATTERNS',
			query: '',
		} );

		// trigger apiFetch
		const { value: apiFetchAction } = generator.next();
		expect( apiFetchAction.request ).toEqual( {
			path: '/wp/v2/wporg-pattern',
		} );

		// Provide response and trigger action
		const { value: received } = generator.next( apiPatterns );
		expect( received ).toEqual( {
			type: 'LOAD_BLOCK_PATTERNS',
			query: '',
			patterns: apiPatterns,
		} );
	} );
} );

