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
    }
}

export default DriverController;