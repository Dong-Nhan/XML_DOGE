var express =  require('express');
var app = express();

app.listen(3000,()=>{
    console.log('localhost:3000');
})

app.use('/Media',express.static('Media'))
app.use('/Css',express.static('views/css'))

app.get('/',(req,res)=>{
    res.redirect('/Khach');
})

app.get('/data',(req,res)=>{
    res.sendFile(__dirname +'/data/Du_lieu.xml');
})

app.get('/Khach',(req,res)=>{
    res.sendFile(__dirname + '/views/Khach-Tham-Quan.html');
})

app.get('/Thu-Ngan-Xem',(req,res)=>{
    res.sendFile(__dirname+'/views/Thu-Ngan-Xem.html')
})

app.get('/Thu-Ngan-Tinh-Tien',(req,res)=>{
    res.sendFile(__dirname+'/views/Thu-Ngan-Tinh-Tien.html')
})

app.get('/Quan-Li',(req,res)=>{
    res.sendFile(__dirname + "/views/Quan-Li.html")
})