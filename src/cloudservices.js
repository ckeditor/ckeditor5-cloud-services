/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/**
 * @module cloud-services/cloudservices
 */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import Token from '@ckeditor/ckeditor-cloud-services-core/src/token/token';

/**
 * Plugin introducing CKEditor 5's Cloud Services integration.
 * It takes care of the {@link module:cloud-services/cloudservices~CloudServicesConfig `config.cloudService`}
 * configuration options and initializes the token provider.
 *
 * @extends module:core/plugin~Plugin
 */
export default class CloudServices extends Plugin {
	/**
	 * @inheritDoc
	 */
	init() {
		const editor = this.editor;
		const config = editor.config;

		const options = config.get( 'cloudServices' ) || {};

		for ( const optionName in options ) {
			this[ optionName ] = options[ optionName ];
		}

		/**
		 * The authentication token URL for CKEditor Cloud Services.
		 *
		 * @readonly
		 * @member {String|undefined} #tokenUrl
		 */

		/**
		 * The URL to which the files should be uploaded.
		 *
		 * @readonly
		 * @member {String} #uploadUrl
		 */

		/**
		 * Other plugins use this token for the authorization process. It handles token requesting and refreshing.
		 * Its value is `null` when {@link module:cloud-services/cloudservices~CloudServicesConfig#tokenUrl} is not provided.
		 *
		 * @readonly
		 * @member {Object|null} #token
		 */

		if ( !this.tokenUrl ) {
			this.token = null;

			return;
		}

		this.token = new CloudServices.Token( this.tokenUrl );

		return this.token.init();
	}
}

CloudServices.Token = Token;

/**
 * The configuration of CKEditor Cloud Services. Introduced by the {@link module:cloud-services/cloudservices~CloudServices} plugin.
 *
 * Read more in {@link module:cloud-services/cloudservices~CloudServicesConfig}.
 *
 * @member {module:cloud-services/cloudservices~CloudServicesConfig} module:core/editor/editorconfig~EditorConfig#cloudServices
 */

/**
 * The configuration for all plugins using CKEditor Cloud Services.
 *
 *		ClassicEditor
 *			.create( document.querySelector( '#editor' ), {
 *				cloudServices: {
 *					tokenUrl: 'https://example.com/cs-token-endpoint',
 *					uploadUrl: 'https://your-organization-id.cke-cs.com/easyimage/upload/'
 *				}
 *			} )
 *			.then( ... )
 *			.catch( ... );
 *
 * See {@link module:core/editor/editorconfig~EditorConfig all editor options}.
 *
 * @interface CloudServicesConfig
 */

/**
 * The URL to the security token endpoint in your application. The role of this endpoint is to securely authorize the
 * end users of your application to use [CKEditor Cloud Services](https://ckeditor.com/ckeditor-cloud-services), only
 * if they should have access e.g. to upload files with Easy Image or to access the Collaboraation service.
 *
 * You can find more information about token endpoints in the
 * {@glink @cs guides/quick-start#create-token-endpoint Cloud Services - Quick start}
 * and {@glink @cs guides/token-endpoints/tokenendpoint Cloud Services - Creating token endpoint} documentation.
 *
 * Without a properly working token endpoint (token URL) CKEditor plugins will not be able to connect to CKEditor Cloud Services.
 *
 * @member {String} module:cloud-services/cloudservices~CloudServicesConfig#tokenUrl
 */

/**
 * The endpoint URL for [CKEditor Cloud Services](https://ckeditor.com/ckeditor-cloud-services) uploads.
 * This option must be set for Easy Image to work correctly.
 *
 * The upload URL is unique for each customer and can be found in the [CKEditor Ecosystem dashboard](https://dashboard.ckeditor.com)
 * after subscribing to Easy Image service.
 * To learn how to start using Easy Image check {@glink @cs guides/easy-image/quick-start Easy Image - Quick start} documentation.
 *
 * Note: Make sure to also set the {@link module:cloud-services/cloudservices~CloudServicesConfig#tokenUrl} configuration option.
 *
 * @member {String} module:cloud-services/cloudservices~CloudServicesConfig#uploadUrl
 */

/**
 * The URL for web socket communication, used by `CollaborativeEditing` plugin. Every customer (organization in the CKEditor
 * Ecosystem dashboard) has its own, unique URLs to communicate with CKEditor Cloud Services. The URL can be found in the
 * CKEditor Ecosystem dashboard.
 *
 * Note: unlike most plugins, `CollaborativeEditing` is not included in any CKEditor 5 build and has to be installed manually.
 * Check [Collaboration overview](https://docs.ckeditor.com/ckeditor5/latest/features/collaboration/overview.html) for more details.
 *
 * @member {String} module:cloud-services/cloudservices~CloudServicesConfig#webSocketUrl
 */

/**
 * Document ID, used by `CollaborativeEditing` plugin. All editor instances created with the same document ID will collaborate.
 * It means that each document needs a different document ID if you do not want to start collaboration between these documents.
 * The ID is usually a primary key of the document in the database, but you are free to provide whatever identifier fits your scenario.
 *
 * Note: unlike most plugins, `CollaborativeEditing` is not included in any CKEditor 5 build and has to be installed manually.
 * Check [Collaboration overview](https://docs.ckeditor.com/ckeditor5/latest/features/collaboration/overview.html) for more details.
 *
 * @member {String} module:cloud-services/cloudservices~CloudServicesConfig#documentId
 */
