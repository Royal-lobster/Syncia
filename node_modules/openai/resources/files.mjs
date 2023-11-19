// File generated from our OpenAPI spec by Stainless.
import { APIResource } from 'openai/resource';
import { multipartFormRequestOptions } from 'openai/core';
import { Page } from 'openai/pagination';
export class Files extends APIResource {
  /**
   * Upload a file that contains document(s) to be used across various
   * endpoints/features. Currently, the size of all the files uploaded by one
   * organization can be up to 1 GB. Please contact us if you need to increase the
   * storage limit.
   */
  create(body, options) {
    return this.post('/files', multipartFormRequestOptions({ body, ...options }));
  }
  /**
   * Returns information about a specific file.
   */
  retrieve(fileId, options) {
    return this.get(`/files/${fileId}`, options);
  }
  /**
   * Returns a list of files that belong to the user's organization.
   */
  list(options) {
    return this.getAPIList('/files', FileObjectsPage, options);
  }
  /**
   * Delete a file.
   */
  del(fileId, options) {
    return this.delete(`/files/${fileId}`, options);
  }
  /**
   * Returns the contents of the specified file
   */
  retrieveContent(fileId, options) {
    return this.get(`/files/${fileId}/content`, {
      ...options,
      headers: {
        Accept: 'application/json',
        ...(options === null || options === void 0 ? void 0 : options.headers),
      },
    });
  }
}
/**
 * Note: no pagination actually occurs yet, this is for forwards-compatibility.
 */
export class FileObjectsPage extends Page {}
(function (Files) {})(Files || (Files = {}));
//# sourceMappingURL=files.mjs.map
