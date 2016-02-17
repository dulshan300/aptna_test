$(document).ready(function() {
	footer();
	submit_data();
	text_only();
	validate();

});

function footer() {
	var winH = $(window).height();
	var docH = $('body').height();
	var footerH = $('footer').height();

	if (docH <= winH) {
		var fixh = winH - docH;
		$('.body').css('height', $('.body').height() + fixh + 40);

	}
}

function submit_data() {
	$('#contact_form').submit(function() {
		var Fname = $(this).find('#fname').val();
		if(validate()){
			
			// Form data submitting
			var fname=$('#fname').val();
			var lname=$('#lname').val();
			var email=$('#email').val();
			var comment=$('#comment').val();
			
			alert(fname+" "+lname+" "+email+" "+comment);
			
			$.post('contact_us.php',{
				fname:fname,
				lname:lname,
				email:email,
				comment:comment
			},function(data){
				alert(data);
			});
			
			
			
			
			
			
			
		}else{
			alert("Please Fill the Required data !!!");
		}

		return false;
	});
}

function validate() {
	var fcount = 0;
	// text
	$ele = $('input[type|=text][required]');
	$ele.each(function(index) {
		var data = $(this).attr('id');
		var val = $(this).val();
		if (val.length < 3) {
			$('label[for|=' + data + ']').css('color', 'red');
			fcount++;
		} else {
			$('label[for|=' + data + ']').css('color', '#fff');
		}

	});

	if (!email_check()) {
		fcount++;
	}

	var ta = $('#comment').val();
	if (ta.length < 10) {
		fcount++;
		$('label[for|=comment]').css('color', 'red');
	} else {
		$('label[for|=comment]').css('color', '#fff');
	}

	if (fcount > 0) {
		return false;
	}
	return true;

}

function email_check() {
	var filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
	$ele = $('input[type|=email]');
	var data = $ele.attr('id');
	var email = $ele.val();
	if (!filter.test(email)) {
		$('label[for|=' + data + ']').css('color', 'red');
		return false;
	}
	$('label[for|=' + data + ']').css('color', '#fff');
	return true;
}

function text_only() {
	$ele = $('input[type|=text]');
	$ele.each(function(index) {
		$(this).keypress(function(e) {
			var code = e.keyCode || e.charCode;
			
			if (!((code > 64 && code < 91) || (code > 96 && code < 123) || (code == 13))) {
				alert('A-z,a-z');
				return false;
			}
			var data = $(this).attr('id');
			if ($(this).val().length > 2) {
				$('label[for|=' + data + ']').css('color', '#fff');
			} else {
				$('label[for|=' + data + ']').css('color', 'red');
			}
		});

	});

	$('input[type|=email]').keypress(function() {
		email_check();
	});

	$('#comment').keypress(function() {
		var ta = $(this).val();
		if (ta.length < 10) {
			fcount++;
			$('label[for|=comment]').css('color', 'red');
		} else {
			$('label[for|=comment]').css('color', '#fff');
		}
	});
}
