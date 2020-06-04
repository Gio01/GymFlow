
new Chart(document.getElementById('myChart'), {
	type: 'pie',
	data: {
		labels: ['Carbs','Protein','Fats'], 
		datasets: [{ 
			data:[200,130,80],
			label: ['Carbs', 'Protein', 'Fats'],
			backgroundColor: ['#572991','#001399','#C40233']
		}]
	}
})


new Chart(document.getElementById('myBar'), {

	type: 'line',
	data:{
		labels: ['Squat','Bench Press','Deadlift'],
		datasets: [{
			data: [250, 145, 300],
			label: ['Squat'],
			backgroundColor: ['#572991','#572991','#572991'],
			fill: false,
			borderColor: '#572991'
		},
		{
			data: [100,150,250],
			label:['Bench Press'],
			backgroundColor: ['#001399','#001399','#001399'],
			fill: false,
			borderColor: '#001399'
		},
		{
			data: [200,250,320],
			label:['Deadlift'],
			backgroundColor: ['#C40233','#C40233','#C40233'],
			fill: false,
			borderColor: '#C40233'
		}]
	},
	options:{
		
	}
	
})





