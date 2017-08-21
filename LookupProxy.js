class LookupProxy {
    constructor(appSettings) {
        this.appSettings = appSettings;
    }

    getInitialState() {
        var self = this;
        var result = new Promise(function(fulfill, reject){
            var url = self.createUrl(self.appSettings.AppServerBaseAddress, ['user','bakeryLocation']);
            var xhttp = new XMLHttpRequest();
            xhttp.onerror = function(errorData) {
                reject(errorData);
            };
            var startLookupDate = Date.now();
            xhttp.onload = function() {
                var timeDiff = Date.now() - startLookupDate;
                var response = JSON.parse(xhttp.responseText);
                console.log('getInitialState completed for: ' + timeDiff + ' milliseconds');
                if (response && response.ExceptionMessage) {
                    reject(response);
                    return;
                }
                fulfill(response);
            };

            xhttp.open('GET', url, true);
            xhttp.setRequestHeader('X-UserId', self.appSettings.UserId);
            xhttp.setRequestHeader('X-ApiKey', self.appSettings.ApiKey);
            xhttp.send();
        });

        return result;
    }
    
    createUrl(baseAddress, lookupNames) {
        var url = baseAddress + 'lookups?';
        for (var i = 0; i < lookupNames.length; i++) {
            if (i > 0) {
                url += '&'; 
            }
            url = url + 'lookupNames=' + lookupNames[i];
        }
        return url;
    }
}

export default LookupProxy;