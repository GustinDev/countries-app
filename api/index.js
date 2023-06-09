//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { saveApiData } = require('./src/controllers/saveApiData.js');

//FORCE:FALSE -> Save POST (true para reuniciar).
// Syncing all the models at once.
conn.sync({ force: false }).then(async () => {
  console.log('DB Conectada - Master');
  //Poner para ver si recibe data, la clg:
  //await saveApiData();
  server.listen(3001, () => {
    console.log('Listening port 3001'); // eslint-disable-line no-console
  });
});
