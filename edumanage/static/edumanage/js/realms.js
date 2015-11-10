
$(document).ready(function(){

	var realms = $('#js-realms').data('realms');
	var jsontext = $('#js-trans').data('json');
	var delurl = $('#js-delurl').data('delurl');

	if(realms){
		var oTable = $('#table')
			.on( 'init.dt', function () {
		       	$('.pagination ul').addClass('pagination');
		    })
		    .dataTable({
				"sPaginationType": "bootstrap",
				"sDom": "<'row-fluid'<'span6'l><'span6'f>r>t<'row-fluid'<'span6'i><'span6'p>>",
				"aoColumns": [{
			        "bSearchable": true,
			        "bSortable": true
			    }, {
			        "bSearchable": true,
			        "bSortable": true
			    }, {
			        "bVisible": true,
			        "bSearchable": false,
			        "bSortable": false
			    }],
			    "aaSorting": [[0, 'desc']],
			    "iDisplayLength": 25,
			    "oSearch": {"bSmart": false, "bRegex":true},
			    "oLanguage": {
			    	"sLengthMenu": jsontext.display+' <select><option value="25">25</option><option value="50">50</option><option value="-1">'+jsontext.all+'</option></select> '+jsontext.realms,
			        "sProcessing":   "Processing...",
			        "sZeroRecords": jsontext.nrecs,
			        "sInfo":         jsontext.showing,
			        "sInfoEmpty":    jsontext.nrecs,
			        "sInfoFiltered": "(filtered from _MAX_ total entries)",
			        "sInfoPostFix":  "",
			        "sSearch":       jsontext.search,
			        "sUrl":          "",
			        "oPaginate": {
			            "sFirst":    jsontext.first,
			            "sPrevious": jsontext.prev,
			            "sNext":     jsontext.next,
			            "sLast":     jsontext.last
			        }
			    }
			});

		oTable.fnDraw();

		$('[id^=del_realm_]').click(function(){
			realm_id = (this.id).replace("del_realm_", '');
			name = this.getAttribute("data-realmname");
			$("#mymodalbody").html(jsontext.dellocwarn+": <b>"+name+"</b><br>"+jsontext.presdel);
			$("#myModalLabel").html(jsontext.delrealm+name);
			$('#myModal').modal('show');
			$(".modal-footer").show();
			$("#realm_name_del").html(name)
			return false;
		});

		$("#delrealmSubmit").click(function(){
			$.ajax({
				url:delurl+"?realm_pk="+realm_id,
				type: "GET",
				success: function(data){
					if (data.error){
						$(".modal-footer").hide();
						$("#mymodalbody").html("<font style='color:#B94A48'>"+data.error+"</font>");
					}
					if (data.success){
						$(".modal-footer").hide();
						$("#mymodalbody").html(jsontext.realm +" "+name+" "+jsontext.succdel);
						window.setTimeout('location.reload()', 1000);

					}
					}
				});
		});
	}
});