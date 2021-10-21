const express = require('express')
const axios = require('axios')
const lineapi = require('line-api')
const app = express()
const port = process.env.PORT || 3000

app.get('/goldprice', async(req, res) => {
  const thaidata = await getgoldprice()
  try {
    const notify = new lineapi.Notify({
        token: 'your access token'
    })
    notify.send({
      message: 'อัพเดทราคาทอง\n' + thaidata.response.date + '\n' + thaidata.response.update_time
        + '\n\nราคาทองรูปพรรณ >>' 
        + '\nซื้อ: ' + thaidata.response.price.gold.buy 
        + '\nขาย: ' + thaidata.response.price.gold.sell
        + '\n\nราคาทองแท่ง >>' 
        + '\nซื้อ: ' + thaidata.response.price.gold_bar.buy 
        + '\nขาย: ' + thaidata.response.price.gold_bar.sell
        + '\n\n developed by minizymint'
    }).then(res.send(thaidata))
  } catch (error) {
      res.send(error)
  }
})

app.listen(port, async() => {
  console.log('Example app listening on port 3000!')
  const thaidata = await getgoldprice()
  try {
    const notify = new lineapi.Notify({
      token: 'your access token'
    })
    notify.send({
      message: 'อัพเดทราคาทอง\n' + thaidata.response.date + '\n' + thaidata.response.update_time
        + '\n\nราคาทองรูปพรรณ >>' 
        + '\nซื้อ: ' + thaidata.response.price.gold.buy 
        + '\nขาย: ' + thaidata.response.price.gold.sell
        + '\n\nราคาทองแท่ง >>' 
        + '\nซื้อ: ' + thaidata.response.price.gold_bar.buy 
        + '\nขาย: ' + thaidata.response.price.gold_bar.sell
        + '\n\n developed by minizymint'
      }).then()
    }
    catch(error){
      console.log(error)
    }
})

const getgoldprice = async() => {
    try {
        const response = await axios.get("https://thai-gold-api.herokuapp.com/latest");
        return response.data
      } catch (error) {
        return error
      }
}