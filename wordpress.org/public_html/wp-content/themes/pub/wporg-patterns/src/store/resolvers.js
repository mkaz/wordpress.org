/**
 * WordPress dependencies
 */
import { addQueryArgs } from '@wordpress/url';
import { apiFetch } from '@wordpress/data-controls';

/**
 * Internal dependencies
 */
import { fetchPatterns, loadPatterns } from './actions';
import { getQueryString } from './utils';

export function* getPatternsByQuery( query ) {
	const queryString = getQueryString( query );
	try {
		yield fetchPatterns( queryString );
		const results = yield apiFetch( {
			path: addQueryArgs( '/wp/v2/wporg-pattern', query ),
		} );
		yield loadPatterns( queryString, results );
	} catch ( error ) {}
}
