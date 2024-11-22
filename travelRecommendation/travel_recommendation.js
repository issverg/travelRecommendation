const team_wrapper = document.getElementById("team_wrapper");
const team_arr = [
	{img: "blank-avatar.png", name: "Joe Doe", role: "CEO"},
	{img: "blank-avatar.png", name: "Merry Poppins", role: "CMO"},
	{img: "blank-avatar.png", name: "Jason Statham", role: "CTO"},
];

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
	team_wrapper.innerHTML = team_arr_mapped.join("");
})();