'use strict'
// adonis make:exception AccesoProhibido
const { LogicalException } = require('@adonisjs/generic-exceptions')

class AccesoProhibidoException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  handle (error,{response}) {
    return response.status(403).json({
      error: 'Acceso no permito al recurso'
    })
  }
}

module.exports = AccesoProhibidoException;
