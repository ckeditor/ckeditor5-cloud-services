/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* global document */

import CloudServices from '../src/cloudservices';
import ClassicTestEditor from '@ckeditor/ckeditor5-core/tests/_utils/classictesteditor';
import TokenMock from './_utils/tokenmock';

const Token = CloudServices.Token;

describe( 'CloudServices', () => {
	const sandbox = sinon.sandbox.create();
	let element;

	beforeEach( () => {
		CloudServices.Token = TokenMock;
		element = document.createElement( 'div' );
		document.body.appendChild( element );
	} );

	afterEach( () => {
		CloudServices.Token = Token;
		document.body.removeChild( element );
		sandbox.restore();
	} );

	it( 'should have `CloudServices` plugin name', () => {
		expect( CloudServices.pluginName ).to.equal( 'CloudServices' );
	} );

	describe( 'init()', () => {
		it( 'should expose its properties based on config', () => {
			return ClassicTestEditor
				.create( element, {
					plugins: [ CloudServices ],
					cloudServices: {
						tokenUrl: 'http://token-endpoint',
						additionalOption: 'some-value'
					}
				} )
				.then( editor => {
					const cloudServices = editor.plugins.get( CloudServices );

					expect( cloudServices ).to.be.instanceOf( CloudServices );
					expect( cloudServices.tokenUrl ).to.equal( 'http://token-endpoint' );
					expect( cloudServices.additionalOption ).to.equal( 'some-value' );

					return editor.destroy();
				} );
		} );

		it( 'should not throw an error when no config is provided', () => {
			return ClassicTestEditor
				.create( element, {
					plugins: [ CloudServices ]
				} );
		} );

		it( 'should expose default uploadUrl if is not provided', () => {
			return ClassicTestEditor
				.create( element, {
					plugins: [ CloudServices ]
				} )
				.then( editor => {
					const cloudServices = editor.plugins.get( CloudServices );

					expect( cloudServices.uploadUrl ).to.equal( 'https://files.cke-cs.com/upload/' );
				} );
		} );

		it( 'should use provided uploadUrl', () => {
			return ClassicTestEditor
				.create( element, {
					plugins: [ CloudServices ],
					cloudServices: {
						uploadUrl: 'https://some-upload-url/'
					}
				} )
				.then( editor => {
					const cloudServices = editor.plugins.get( CloudServices );

					expect( cloudServices.uploadUrl ).to.equal( 'https://some-upload-url/' );
				} );
		} );

		it( 'should provide token if tokenUrl is provided', () => {
			CloudServices.Token.initialToken = 'initial-token';

			return ClassicTestEditor
				.create( element, {
					plugins: [ CloudServices ],
					cloudServices: {
						tokenUrl: 'http://token-endpoint',
					}
				} )
				.then( editor => {
					const cloudServices = editor.plugins.get( CloudServices );

					expect( cloudServices.token.value ).to.equal( 'initial-token' );

					return editor.destroy();
				} );
		} );

		it( 'should not provide token if tokenUrl is not provided', () => {
			CloudServices.Token.initialToken = 'initial-token';

			return ClassicTestEditor
				.create( element, {
					plugins: [ CloudServices ],
					cloudServices: {}
				} )
				.then( editor => {
					const cloudServices = editor.plugins.get( CloudServices );

					expect( cloudServices.token ).to.equal( null );
				} );
		} );
	} );

	describe( 'destroy()', () => {
		it( 'should stop listening on the token change', () => {
			return ClassicTestEditor
				.create( element, {
					plugins: [ CloudServices ],
					cloudServices: {
						tokenUrl: 'http://token-endpoint',
					}
				} )
				.then( editor => {
					const cloudServices = editor.plugins.get( CloudServices );
					const stub = sandbox.stub( cloudServices.token, '_stopRefreshing' );
					cloudServices.destroy();

					expect( cloudServices.token ).to.be.null;
					expect( stub.calledOnce ).to.be.true;
				} );
		} );
	} );
} );
