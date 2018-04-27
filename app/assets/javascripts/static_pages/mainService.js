app.service("mainService",['$http','$q', function($http,$q){
	var self = this;

	self.loadItems = function() {
		return $http.get('/api/v1/items.json').then(function(res) {
			if (res.status == 200) {
				return res;
			}	
		}).catch(function onError(err) {
      console.log(err);
      return err;
    });
	}

	self.updateCurrentPrice = function(id, params){
		return $http.put('/api/v1/items/' + id +'.json',  params).then(function(res){
			return res;
		})
	}

	

}]);