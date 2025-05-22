export function setEventServicesPrice(schema) {
    const SERVICE_PRICES = {
        "Servicio de Meseros": 100,
        "Servicio de Bartender": 120,
        "Servicio de Bouffett": 200,
        "Servicio de Reuniones": 80,
        "Servicio de Fiesta": 150,
        "Servicio de Decoracion": 90,
        "Servicio de Staff": 110
    };

    schema.pre('save', function(next) {
        if (this.isModified('resources') || this.isNew) {
            this.resourcesPrice = (this.resources || []).reduce(
                (total, service) => total + (SERVICE_PRICES[service] || 0), 0
            );
        }
        next();
    });
}