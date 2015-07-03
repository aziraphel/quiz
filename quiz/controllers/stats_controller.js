var models = require ('../models/models.js');

//Autoload - factoriza el codigo si ruta incluye :quizId
exports.getstats = function(req, res, next){
	models
	.Quiz.findAll({
		include: [{model: models.Comment}]
	})
	.then(
		function(quiz){
			var stats = {'Total preguntas':quiz.length,
			'Total comentarios': 0,
			'Media comentarios pregunta': 0,
			'Preguntas sin comentarios': 0,
			'Preguntas con comentarios': 0,
			}
			for(var i in quiz){
				if(quiz[i].Comments){
					stats['Total comentarios']+=quiz[i].Comments.length;
					if(quiz[i].Comments.length>0){
						stats['Preguntas con comentarios']++;	
					}else {
					stats['Preguntas sin comentarios']++;
					} 
					
				} else {
					stats['Preguntas sin comentarios']++;
				}
			}
			if (stats['Total preguntas']>0){
				stats['Media comentarios pregunta'] = stats['Total comentarios']/stats['Total preguntas'];
			}
			//stats['Total comentarios'] = Comments.length;
			for( var key in stats){console.log(key+": "+stats[key]);}
			res.render('quizes/statistics', {stats: stats, errors: []});	
		
		}).catch(function (error){next(error);});
};
