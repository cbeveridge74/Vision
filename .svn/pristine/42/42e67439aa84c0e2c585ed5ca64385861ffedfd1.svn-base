function MacroExistingForms(){
	
	var superRecreateForm = FormBuilderState.existingFormsInstance.recreateForm;
	FormBuilderState.existingFormsInstance.recreateForm = function( data ){
		superRecreateForm.call( this, data );
		createSections();
	};
	
	var superCreateSettingsObjectForElement = FormBuilderState.existingFormsInstance.createSettingsObjectForElement;
	FormBuilderState.existingFormsInstance.createSettingsObjectForElement = function( element ){
		var settings = new Object();
		$.each( element.children( 'settings' ).children(), function( key, value ){
			// If we're dealing with an object (this is specific for the structure of the questions and option titles)
			if( $( value ).children().length > 0 ){
				// Create object that will contain the array object
				settings[ value.nodeName ] = new Object();
				$.each( $( value ).children(), function( index, element ){
					if( null == settings[ value.nodeName ][element.nodeName] ){
						settings[ value.nodeName ][element.nodeName] = new Array();
					}
					settings[ value.nodeName ][element.nodeName].push( $( element ).text() );
				});
			}else{
				settings[ value.nodeName ] = $( value ).text();
			}
		});
		return settings;
	};
	
	var superCreateConfigurationObject = FormBuilderState.existingFormsInstance.createConfigurationObject;
	FormBuilderState.existingFormsInstance.createConfigurationObject = function( laterality, element ){
		var components = superCreateConfigurationObject.call( this, laterality, element );
		$.each( components, function( index, component ){
			if( component.type != null && component.type.indexOf( "fragmentfield" ) > -1 ){
				component.type = component.type.replace( /fragmentfield/gi, "" );
				component.importedFormName = component.settings.formfragment;
			}
//			if( formName != null ){
//				component.importedFormName = formName;
//				console.log( formName );
//			}
		});
		return components;
	};
	
	var superCreateRowComponent = FormBuilderState.existingFormsInstance.createRowComponent;
	FormBuilderState.existingFormsInstance.createRowComponent = function( configurationComponentLeft, configurationComponentRight ){
		if( configurationComponentLeft != null && 
			configurationComponentLeft.length > 0 &&
			configurationComponentLeft[0].importedFormName != null ){
			FormBuilderState.mainScreenInstance.createRowComponent( configurationComponentLeft, configurationComponentRight, configurationComponentLeft[0].importedFormName );
		}else if( configurationComponentRight != null &&
				  configurationComponentRight.length > 0 &&
				  configurationComponentRight[0].importedFormName != null ){
			FormBuilderState.mainScreenInstance.createRowComponent( configurationComponentLeft, configurationComponentRight, configurationComponentRight[0].importedFormName );
		}else{
			superCreateRowComponent.call( this, configurationComponentLeft, configurationComponentRight );
		}
	};
	
	var createSections = function(){
		var sectionFirstLastRowInstances = XMLUtil.findSectionSettingsAndFirstLastRows( FormBuilderState.existingFormsInstance.formStructure );
		$.each( sectionFirstLastRowInstances, function( index, element ){
			var allSectionRows;
			element.firstRow.addClass( 'first-component' );
			element.lastRow.addClass( 'last-component' );
			// If there is only one row in the section
			if( element.firstRow.hasClass( 'first-component' ) &&
					element.firstRow.hasClass( 'last-component' )){
				allSectionRows = new Array();
				allSectionRows.push( element.firstRow[0] );
			}else{
				// Get all the rows between the first and last
				allSectionRows = $( '.first-component' ).nextUntil( '.last-component' );
				// Add the first one to the start
				allSectionRows.splice( 0, 0, $( '.first-component' )[0] );
				// Add the last one to the end
				allSectionRows.push( $( '.last-component' )[0] );
			}
			$( '.first-component' ).removeClass( 'first-component' );
			$( '.last-component' ).removeClass( 'last-component' );
			var section = FormBuilderState.macroMainScreenInstance.createSection( element.settings, "" );
			// Wrapping will put the components almost where we want them
			$( allSectionRows ).wrapAll( section );
			// Need to move the components up a level
			$( "#" + section.attr( 'id' ) ).children( '.section-spacer' ).children().appendTo( "#" + section.attr( 'id' ) );
			FormBuilderState.macroMainScreenInstance.makeSectionDroppableAndSortable( $( "#" + section.attr( 'id' ) ) );
			FormBuilderState.macroMainScreenInstance.updateSectionNames();
		});
	};
}