const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const cors = require('cors')
const morgan = require('morgan')
const connectDb = require('./config/db')
const app = express()
const certificationRoutes = require('./routes/certifications')
//Load config
const technicalSkillsRoutes = require('./routes/technicalskills')
const projectSkillsRoutes = require('./routes/project')
const coursesRoutes = require('./routes/course')
const achievementRoutes = require('./routes/achievements')
dotenv.config();
const cookieParser = require('cookie-parser');

//mongodb connection
connectDb()

// app.use(cors({
//     credentials: true
// }));
// app.use(cookieParser());

// body parse && middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

//routes
app.use('/', require('./routes/userRouter'))
app.use('/admin', require('./routes/adminRouter'))

//PORT NUMBER
const PORT = process.env.PORT || 8080

app.use('/api/softskills',require('./routes/softskills'))
app.use('/api/personal', require('./routes/personaldetails'));
app.use('/api/technical', technicalSkillsRoutes);
app.use('/api/project', projectSkillsRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/certifications', certificationRoutes);

//server port
app.listen(PORT, () => { console.log(`runing on port ${PORT}`) })