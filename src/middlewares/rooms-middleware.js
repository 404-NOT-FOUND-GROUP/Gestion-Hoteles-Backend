export function setRoomPrice(schema) {
    schema.pre('save', function(next) {
        const prices = {
            STANDARD: 50,
            SUITE: 100,
            DELUXE: 200,
            PRESIDENTIAL: 500
        };
        if (this.isModified('type') || this.isNew) {
            this.price = prices[this.type] || 0;
        }
        next();
    });
}