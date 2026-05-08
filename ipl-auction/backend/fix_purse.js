const mongoose = require('mongoose');

const MONGO_URI = 'mongodb://jagannathswai1_db_user:Jaggu%40123@ac-nmppzsh-shard-00-00.qyh8jeg.mongodb.net:27017,ac-nmppzsh-shard-00-01.qyh8jeg.mongodb.net:27017,ac-nmppzsh-shard-00-02.qyh8jeg.mongodb.net:27017/Jaggu?ssl=true&replicaSet=atlas-83xwjb-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGO_URI).then(async () => {
  const Team = require('./models/Team');
  const Player = require('./models/Player');
  
  const teams = await Team.find({});
  
  for (const team of teams) {
    // Get all sold players for this team
    const soldPlayers = await Player.find({ soldTo: team._id, status: 'sold' });
    const totalSpent = soldPlayers.reduce((sum, p) => sum + (p.soldPrice || 0), 0);
    const newPurseRemaining = team.purse - totalSpent;
    
    console.log(`${team.name}: purse=${team.purse}, spent=${totalSpent}, oldRemaining=${team.purseRemaining}, newRemaining=${newPurseRemaining}`);
    
    await Team.findByIdAndUpdate(team._id, { 
      purseRemaining: newPurseRemaining,
      players: soldPlayers.map(p => p._id)
    });
  }
  
  console.log('All teams purse recalculated!');
  process.exit();
}).catch(err => { console.error(err); process.exit(1); });