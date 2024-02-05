chrome.app.runtime.onLaunched.addListener(function() {
  
    chrome.app.window.create('jasmine-standalone-2.1.3/SpecRunner.html',
    {
            'bounds': {
		      'width': 1024,
		      'height': 768
		    }
        }
    );
});