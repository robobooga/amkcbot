var before="completion!"
var current="Today is the day!"
var montharray=new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec")
var finalString = ""
function countdown(yr,m,d){
    theyear=yr;themonth=m;theday=d
    var today=new Date()
    var todayy=today.getYear()
    if (todayy < 1000)
      todayy+=1900
    var todaym=today.getMonth()
    var todayd=today.getDate()
    var todayh=today.getHours()
    var todaymin=today.getMinutes()
    var todaysec=today.getSeconds()
    var todaystring=montharray[todaym]+" "+todayd+", "+todayy+" "+todayh+":"+todaymin+":"+todaysec
    futurestring=montharray[m-1]+" "+d+", "+yr
    dd=Date.parse(futurestring)-Date.parse(todaystring)
    dday=Math.floor(dd/(60*60*1000*24)*1)
    dhour=Math.floor((dd%(60*60*1000*24))/(60*60*1000)*1)
    dmin=Math.floor(((dd%(60*60*1000*24))%(60*60*1000))/(60*1000)*1)
    dsec=Math.floor((((dd%(60*60*1000*24))%(60*60*1000))%(60*1000))/1000*1)
    finalString = "Only "+dday+ " days left until "+before
}


var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const axios = require('axios')

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
     extended: true
})); // for parsing application/x-www-form-urlencoded

//This is the route the API will call
app.post('/new-message', function(req, res) {
  const {message} = req.body
  var input = message.text.toLowerCase()
  //Each message contains "text" and a "chat" object, which has an "id" which is the chat id
  switch(input) {
    case '!cd':
    case '!countdown':
      countdown(2020,8,31)
      break;
    case '!help':
    case '!list':
    case '!commands':
      finalString = "• !cd/!countdown\n" +
      "• !help/!list/!commands\n" +
      "• !pdf/!brochure\n" +
      "• !neighbourhood/!neighborhood/!amenities\n" +
      "• !toilettiles/!kitchentiles/!serviceyardtiles\n" +
      "• !rules\n" +
      "• !pinterest\n" +
      "• !fb/!facebook"
      break;
    case '!pdf':
    case '!brochure':
      finalString = "Here you go: http://esales.hdb.gov.sg/hdbvsf/eap001.nsf/0/16MAYBTO_pdf_selection_1705/$FILE/Ang_Mo_Kio_Court.pdf"
      break;
    case '!neighbourhood':
    case '!neighborhood':
    case '!amenities':
      finalString = "• Nearest Convenience Store: SPC at 793 Ang Mo Kio Avenue 1\n" +
      "• Nearest Petrol Station: SPC at 793 Ang Mo Kio Avenue 1\n" +
      "• Nearest ATM: UOB/POSB at 226C Ang Mo Kio Ave 1\n" +
      "• Nearest AXS Machine: 128 Ang Mo Kio Ave 3\n" +
      "• Nearest Gym: Anytime Fitness at Ang Mo Kio Central\n" +
      "• Nearest Police Post: Kebun Baru Neighborhood Police Post\n" +
      "• Nearest Clinic: S Y Ng Clinic at 226A Ang Mo Kio Ave 1\n" +
      "• Nearest Hospital: Mount Alvernia Hospital" 
      break;
    case '!toilettiles':
    case '!kitchentiles':
    case '!serviceyardtiles':
      finalString = "Here you go: https://scontent-sit4-1.xx.fbcdn.net/v/t1.0-9/22365621_167407407173715_1589342577267964230_n.jpg?oh=bc3febbc5019a6ba66a0e1cff66b6236&oe=5ABCE118"
      break;
    case '!rules':
      finalString = "DO: \n✅ Update on new stuffs \n✅ Be active \n\nDON’T: \n❌ Strictly NO advertising allowed \n❌ Admins reserve the right to remove all advertisements and the person who posted it immediately ‼️"
      break;
    case '!pinterest':
      finalString = "Here you go: https://www.pinterest.com/cchong0783/home-interior-referencing-information-corner/"
      break;
    case '!fb':
    case '!facebook':
      finalString = "Here you go: https://www.facebook.com/groups/1228159647218536/"
      break;
    default:
      return res.end();
  }


  axios.post('https://api.telegram.org/bot500219655:AAFAeFdB9Ip-BE_wzYp88AjST7aXqM2gblo/sendMessage', {
    chat_id: message.chat.id,
    text: finalString
  })
  .then(response => {
    // We get here if the message was successfully posted
    console.log('Message posted')
    res.end('ok')
  })
  .catch(err => {
    // ...and here if it was not
    console.log('Error :', err)
    res.end('Error :' + err)
  })

});

// Finally, start our server
app.listen(3000, function() {
  console.log('Telegram app listening on port 3000!');
});
