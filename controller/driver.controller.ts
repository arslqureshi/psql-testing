import pool from '../src/db';

const DriverController = {
    async getDriverRequests(req, res) {
        try {
            const {lat, lng} = req.params;
            var data = [];
            const query = await pool.query(
                `select * from driver_request`
            );
            await query.rows.forEach(request => {
                var ky = 40000 / 360;
                var kx = Math.cos(Math.PI * request.lat / 180.0) * ky;
                var dx = Math.abs(parseFloat(request.lng) - parseFloat(lng)) * kx;
                var dy = Math.abs(parseFloat(request.lat) - parseFloat(lat)) * ky;
                if(Math.sqrt(dx * dx + dy * dy) <= 5) {
                  data.push(request);    
                }
            })
            res.send(data);
        }catch(error){
            console.log(error.message)
        }
    },
    async getRequestLocations(req, res) {
        try {
            const {id} = req.params;
            const query = await pool.query(
                `select request_locations.id as id, driver_request.lat as lat, driver_request.lng as lng, request_locations.lat as reqLat, request_locations.lng as reqLng, driver_request.status
                 from driver_request 
                 join request_locations on driver_request.id = request_locations.requestId
                 where driver_request.id = $1`,
                 [id]
            );
            res.status(200).send(query.rows);
        } catch (error) {
            console.log(error.message);
        }
    }
}

export default DriverController;