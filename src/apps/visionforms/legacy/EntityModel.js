function EntityModel(){
	
	var self = this;
	var entity;
	
	self.getEntity = function(){
		if( entity == null ){
			entity = new EntityObject();
		}
		return entity;
	};
}