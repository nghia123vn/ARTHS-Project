﻿using ARTHS_Service.Interfaces;
using ARTHS_Utility.Helpers;
using ARTHS_Utility.Settings;
using Google;
using Google.Cloud.Storage.V1;
using Microsoft.Extensions.Options;
using System.Web;

namespace ARTHS_Service.Implementations
{
    public class CloudStorageService : ICloudStorageService
    {
        private static readonly StorageClient Storage;
        private readonly AppSetting _settings;

        static CloudStorageService()
        {
            Storage = CloudStorageHelper.GetStorage();
        }

        public CloudStorageService(IOptions<AppSetting> settings)
        {
            _settings = settings.Value;
        }

        public async Task<string> Upload(Guid id, string contentType, Stream stream)
        {
            try
            {
                await Storage.UploadObjectAsync(
                    _settings.Bucket,
                    $"{_settings.Folder}/{id}",
                    contentType,
                    stream,
                    null,
                    CancellationToken.None);
                var baseURL = "https://firebasestorage.googleapis.com/v0/b";
                var filePath = $"{_settings.Folder}%2F{id}";
                var url = $"{baseURL}/{_settings.Bucket}/o/{filePath}?alt=media";
                return url;
            }
            catch
            {
                throw;
            }
        }

        // Delete an object, IsSuccess if deleted successfully or not found
        public async Task<string> Delete(Guid id)
        {
            try
            {
                await Storage.DeleteObjectAsync(
                    _settings.Bucket,
                    $"{_settings.Folder}/{id}",
                    null,
                    CancellationToken.None
                    );
                return "Delete success";
            }
            catch(GoogleApiException ex)
            {
                return ex.HttpStatusCode.ToString();
            }
        }


        // Object url
        public string GetMediaLink(Guid id)
        {
            return CloudStorageHelper.GenerateV4UploadSignedUrl(
                HttpUtility.UrlEncode(_settings.Bucket),
                _settings.Folder + '/' + id);
        }
    }
}
