'use strict'
const Proyecto = use("App/models/Proyecto");
const Tarea = use("App/models/Tarea");
const AutorizacionService = use('App/Services/AutorizacionService')
class TareaController {

    async index({auth,request,params}){
        const user = await auth.getUser();
        const {id} = params;
        const proyecto = await Proyecto.find(id);
        AutorizacionService.verificarPermiso(proyecto,user);
        return await proyecto.tareas().fetch();
    }

    async create({auth, request,params}){
        const user = await auth.getUser();
        const {description} = request.all();
        const {id} = params;
        const proyecto = await Proyecto.find(id);
        AutorizacionService.verificarPermiso(proyecto,user);
        const tarea = new Tarea();
        tarea.fill({
            description
        })
        await proyecto.tareas().save(tarea);
        return tarea;
    }

    async destroy({auth,params}){
        const user = await auth.getUser();
        console.log('params: ' + params)
        const {id} = params;
        const tarea = await Tarea.find(id);
        const proyecto = await tarea.proyecto().fetch(); //traer el proyecto al que pertene nuestra tarea (belognsTo) en el modelo
        AutorizacionService.verificarPermiso(proyecto,user);
        await tarea.delete();
        return tarea;

    }

    async update({auth,params,request}){
        const user = await auth.getUser();
        const {id} = params;
        const tarea = await Tarea.find(id)
        const proyecto = await Proyecto.find(id);
        AutorizacionService.verificarPermiso(proyecto,user);
        await tarea.merge(request.only([
            'description',
            'completada'
        ]));
        await tarea.save();
        return tarea;
    }

}

module.exports = TareaController
