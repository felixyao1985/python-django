<!-- .block start -->
<div class="block">

	<!-- .block_head start -->
	<div class="block_head">
		<div class="bheadl"></div>
		<div class="bheadr"></div>
		
		<h2 id="h2Msg">Msg</h2>
	</div>
	<!-- .block_head ends -->
	
	<!-- .block_head start -->
	<div class="block_content map">
		<div id="datamap"></div>
	</div>
	<!-- .block_content ends -->
	
	<!-- .block_head start -->
	<div class="block_content form">
		<div>
			<ul class="givePriority">
				<li class="title">{{tpldicts.givePriority}}</li>
				<li class="sub opt">{{tpldicts.populationDensity}}</li>
				<li class="sub opt">{{tpldicts.traffic}}</li>
				<li class="sub opt">{{tpldicts.serviceEfficiency}}</li>
				<li class="sub opt">{{tpldicts.facilities}}</li>
			</ul>
			<ul class="basicSet">
				<li class="title">{{tpldicts.basicSet}}</li>
				<li class="sub ipt">{{tpldicts.maxNumIterations}} <input name="MaxNum" type="text" class="text " id="txtmaxNum" value="1" maxlength="3"></li>
				<li class="sub ipt">{{tpldicts.convergenceThreshold}} <input name="CTNum" type="text" class="text " id="txtCTNum" value="1" maxlength="3"></li>
			</ul>
		</div>
		<div class="divcontrol">
			<div><input type="checkbox" value="dynamic" name="Dynamic" checked>{{tpldicts.tipMapSubmit}}</div>
			<div><input type="button" name="MapSubmit" id="btnMapSubmit" value=" {{tpldicts.mapSubmit}} " class="submit small" /></div>
		</div>
	</div>
	<!-- .block_content ends -->

	<div class="bendl"></div>
	<div class="bendr"></div>
</div>
<!-- .block ends -->

