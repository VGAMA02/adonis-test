'use strict'

const Proyecto = use("App/models/Proyecto");
const AutorizacionService = use('App/Services/AutorizacionService')
class ProyectoController {
    async index({auth}){
        const user = await auth.getUser();
        console.log(user.id);
        return await user.proyectos().fetch();
    }

    async create({auth, request}){
        const user = await auth.getUser();
        console.log(user.id);
        const {nombre} = request.all();
        const proyecto = new Proyecto();
        proyecto.fill({ //fill llena los datos en el objecto de una.
            nombre
        })
        await user.proyectos().save(proyecto);
        return proyecto;
    }

    async destroy({auth,params}){
        const user = await auth.getUser();
        console.log('params: ' + params)
        const {id} = params;
        console.log('id: ' + id);
        const proyecto = await Proyecto.find(id);
        console.log(proyecto.user_id);
        AutorizacionService.verificarPermiso(proyecto,user);
        await proyecto.delete();
        return proyecto;

    }

    async update({auth,params,request}){
        const user = await auth.getUser();
        const {id} = params;
        const proyecto = await Proyecto.find(id);
        AutorizacionService.verificarPermiso(proyecto,user);
        await proyecto.merge(request.only('nombre'));
        await proyecto.save();
        return proyecto;
    }

}

module.exports = ProyectoController
