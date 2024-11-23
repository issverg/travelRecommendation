const team_wrapper = document.getElementById("team_wrapper");
const search = document.getElementById("search_field");
const search_btn = document.getElementById("search_btn");
const clear_btn = document.getElementById("clear_btn");
const results_field = document.getElementById("rec_results");
const CLK = "click";const BEA = ["beach", "beaches"];
const TEM = ["temple", "temples"];
const COU = ["japan", "brazil", "australia"];
const team_arr = [
	{img: "blank-avatar.png", name: "Joe Doe", role: "CEO"},
	{img: "blank-avatar.png", name: "Merry Poppins", role: "CMO"},
	{img: "blank-avatar.png", name: "Jason Statham", role: "CTO"},
];

if(search_btn) {
	search_btn.addEventListener(CLK, performSearch);
	clear_btn.addEventListener(CLK, resetResults);
}

async function performSearch() {
	const search_text = search.value.toLowerCase();
    let res_arr = [];
	let res = await fetch("travel_recommendation_api.json")
		.then(resp => resp.json())
		.then(data => {
            if(search_text === "")
                return;

            if(BEA.includes(search_text))
                res_arr = data.beaches;
            
            if(COU.includes(search_text))
                res_arr = data.countries.filter(cou => cou.name.toLowerCase() === search_text).cities;

            if(TEM.includes(search_text))
                res_arr = data.temples;
            
            return res_arr.map(item => `
                <div class="res_item">
                    <img src="${item.imageUrl}">
                    <h4>${item.name}</h4>
                    <p>${item.description}</p>
                </div>
            `);	
        })
        .catch(err => console.log(err));

        results_field.innerHTML = res.join();
}

function resetResults() {
	console.log("!!!");
    search.value = "";
	results_field.innerHTML = "";
}

(function fillTeamMembers() {
	let team_arr_mapped = team_arr.map(member => 
		`
		<div class="member_card">
			<img src="${member.img}">
			<div class="member_info">
				<h4>${member.name}</h4>
				<p>${member.name} is responsible for...</p>
				<div class="member_role">${member.role}</div>
			</div>
		</div>
		`
	);
	
	if(team_wrapper)
		team_wrapper.innerHTML = team_arr_mapped.join("");
})();