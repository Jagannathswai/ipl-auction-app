// const express = require('express');
// const router = express.Router();
// const path = require('path');
// const Team = require('../models/Team');
// const Player = require('../models/Player');
// const { protect, adminOnly } = require('../middleware/auth');

// // GET /api/teams
// router.get('/', async (req, res) => {
//   try {
//     const { room } = req.query;
//     let query = {};
//     if (room) query.room = room;

//     const teams = await Team.find(query)
//       .populate('owner', 'name email')
//       .populate('players', 'name role photo soldPrice')
//       .sort({ createdAt: 1 });
//     res.json({ success: true, teams });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// });

// // GET /api/teams/my/team
// router.get('/my/team', protect, async (req, res) => {
//   try {
//     const team = await Team.findOne({ owner: req.user._id })
//       .populate('players');
//     if (!team) return res.status(404).json({ success: false, message: 'No team assigned' });
//     res.json({ success: true, team });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// });

// // GET /api/teams/:id
// router.get('/:id', protect, async (req, res) => {
//   try {
//     const team = await Team.findById(req.params.id)
//       .populate('owner', 'name email phone')
//       .populate('players');
//     if (!team) return res.status(404).json({ success: false, message: 'Team not found' });
//     res.json({ success: true, team });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// });

// // POST /api/teams (admin)
// router.post('/', protect, adminOnly, async (req, res) => {
//   try {
//     let logoPath = '';
//     if (req.files && req.files.logo) {
//       const logo = req.files.logo;
//       const fileName = `team_${Date.now()}${path.extname(logo.name)}`;
//       const fs = require('fs');
//       fs.mkdirSync(path.join(__dirname, '../uploads/teams'), { recursive: true });
//       await logo.mv(path.join(__dirname, '../uploads/teams', fileName));
//       logoPath = `/uploads/teams/${fileName}`;
//     }

//     const team = await Team.create({ ...req.body, logo: logoPath });
//     res.status(201).json({ success: true, team });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// });

// // PUT /api/teams/:id (admin)
// router.put('/:id', protect, adminOnly, async (req, res) => {
//   try {
//     let updateData = { ...req.body };
//     if (req.files && req.files.logo) {
//       const logo = req.files.logo;
//       const fileName = `team_${Date.now()}${path.extname(logo.name)}`;
//       const fs = require('fs');
//       fs.mkdirSync(path.join(__dirname, '../uploads/teams'), { recursive: true });
//       await logo.mv(path.join(__dirname, '../uploads/teams', fileName));
//       updateData.logo = `/uploads/teams/${fileName}`;
//     }
//     const team = await Team.findByIdAndUpdate(req.params.id, updateData, { new: true });
//     if (!team) return res.status(404).json({ success: false, message: 'Team not found' });
//     res.json({ success: true, team });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// });

// // DELETE /api/teams/:id (admin)
// router.delete('/:id', protect, adminOnly, async (req, res) => {
//   try {
//     await Team.findByIdAndDelete(req.params.id);
//     res.json({ success: true, message: 'Team deleted' });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// });

// // PUT /api/teams/:id/assign-owner
// router.put('/:id/assign-owner', protect, adminOnly, async (req, res) => {
//   try {
//     const { ownerId } = req.body;
//     const team = await Team.findByIdAndUpdate(req.params.id, { owner: ownerId }, { new: true })
//       .populate('owner', 'name email');
//     res.json({ success: true, team });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// });

// module.exports = router;


// const express = require('express');
// const router = express.Router();
// const path = require('path');
// const fs = require('fs');
// const Team = require('../models/Team');
// const Player = require('../models/Player');
// const { protect, adminOnly } = require('../middleware/auth');

// // GET /api/teams
// router.get('/', protect, async (req, res) => {
//   try {
//     const teams = await Team.find()
//       .populate('owner', 'name email')
//       .populate('players', 'name photo role soldPrice status');
//     res.json({ success: true, teams });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// });

// // GET /api/teams/my/team
// router.get('/my/team', protect, async (req, res) => {
//   try {
//     const team = await Team.findOne({ owner: req.user._id })
//       .populate('players', 'name photo role soldPrice status');
//     if (!team) return res.status(404).json({ success: false, message: 'No team assigned' });
//     res.json({ success: true, team });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// });

// // GET /api/teams/:id
// router.get('/:id', protect, async (req, res) => {
//   try {
//     const team = await Team.findById(req.params.id)
//       .populate('owner', 'name email')
//       .populate('players', 'name photo role soldPrice status');
//     if (!team) return res.status(404).json({ success: false, message: 'Team not found' });
//     res.json({ success: true, team });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// });

// // POST /api/teams
// router.post('/', protect, adminOnly, async (req, res) => {
//   try {
//     const teamData = { ...req.body };
//     teamData.purseRemaining = teamData.purse;

//     if (req.files && req.files.logo) {
//       const logo = req.files.logo;
//       const uploadDir = path.join(__dirname, '../uploads/teams');
//       fs.mkdirSync(uploadDir, { recursive: true });
//       const fileName = 'team_' + Date.now() + path.extname(logo.name);
//       await logo.mv(path.join(uploadDir, fileName));
//       teamData.logo = '/uploads/teams/' + fileName;
//     }

//     const team = await Team.create(teamData);
//     res.status(201).json({ success: true, team });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// });

// // PUT /api/teams/:id
// router.put('/:id', protect, adminOnly, async (req, res) => {
//   try {
//     const existing = await Team.findById(req.params.id);
//     if (!existing) return res.status(404).json({ success: false, message: 'Team not found' });

//     const updateData = { ...req.body };

//     // If purse changed, adjust purseRemaining accordingly
//     if (updateData.purse && Number(updateData.purse) !== existing.purse) {
//       const diff = Number(updateData.purse) - existing.purse;
//       updateData.purseRemaining = existing.purseRemaining + diff;
//     }

//     if (req.files && req.files.logo) {
//       const logo = req.files.logo;
//       const uploadDir = path.join(__dirname, '../uploads/teams');
//       fs.mkdirSync(uploadDir, { recursive: true });
//       const fileName = 'team_' + Date.now() + path.extname(logo.name);
//       await logo.mv(path.join(uploadDir, fileName));
//       updateData.logo = '/uploads/teams/' + fileName;
//     }

//     const team = await Team.findByIdAndUpdate(req.params.id, updateData, { new: true });
//     res.json({ success: true, team });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// });

// // DELETE /api/teams/:id
// router.delete('/:id', protect, adminOnly, async (req, res) => {
//   try {
//     await Team.findByIdAndDelete(req.params.id);
//     res.json({ success: true, message: 'Team deleted' });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// });

// // PUT /api/teams/:id/assign-owner
// router.put('/:id/assign-owner', protect, adminOnly, async (req, res) => {
//   try {
//     const { ownerId } = req.body;
//     const team = await Team.findByIdAndUpdate(req.params.id, { owner: ownerId || null }, { new: true });
//     res.json({ success: true, team });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// });

// // PUT /api/teams/:id/manual-assign - Admin manually assigns player to team
// router.put('/:id/manual-assign', protect, adminOnly, async (req, res) => {
//   try {
//     const { playerId, price } = req.body;
//     if (!playerId || !price) return res.status(400).json({ success: false, message: 'Player and price required' });

//     const team = await Team.findById(req.params.id);
//     if (!team) return res.status(404).json({ success: false, message: 'Team not found' });

//     if (price > team.purseRemaining) {
//       return res.status(400).json({ success: false, message: 'Insufficient purse! Available: Rs.' + team.purseRemaining + 'L' });
//     }

//     const player = await Player.findByIdAndUpdate(playerId, {
//       status: 'sold',
//       soldPrice: price,
//       soldTo: team._id,
//     }, { new: true });

//     if (!player) return res.status(404).json({ success: false, message: 'Player not found' });

//     // Update team
//     team.players.push(playerId);
//     team.purseRemaining -= price;
//     const roleMap = { 'Batsman': 'batsmen', 'Bowler': 'bowlers', 'All-Rounder': 'allRounders', 'Wicket-Keeper': 'wicketKeepers' };
//     if (roleMap[player.role]) team.stats[roleMap[player.role]] = (team.stats[roleMap[player.role]] || 0) + 1;
//     await team.save();

//     res.json({ success: true, message: player.name + ' assigned to ' + team.name + ' for Rs.' + price + 'L', player, team });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// });

// // PUT /api/teams/recalculate/purse - Fix purse for all teams
// router.put('/recalculate/purse', protect, adminOnly, async (req, res) => {
//   try {
//     const teams = await Team.find({});
//     const results = [];
//     for (const team of teams) {
//       const soldPlayers = await Player.find({ soldTo: team._id, status: 'sold' });
//       const totalSpent = soldPlayers.reduce((sum, p) => sum + (p.soldPrice || 0), 0);
//       const newPurseRemaining = team.purse - totalSpent;
//       await Team.findByIdAndUpdate(team._id, {
//         purseRemaining: newPurseRemaining,
//         players: soldPlayers.map(p => p._id)
//       });
//       results.push({ team: team.name, purse: team.purse, spent: totalSpent, remaining: newPurseRemaining });
//     }
//     res.json({ success: true, message: 'All teams purse recalculated!', results });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// });

// module.exports = router;






// v2 - manual assign enabled
const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const Team = require('../models/Team');
const Player = require('../models/Player');
const { protect, adminOnly } = require('../middleware/auth');

// GET /api/teams
router.get('/', protect, async (req, res) => {
  try {
    const teams = await Team.find()
      .populate('owner', 'name email')
      .populate('players', 'name photo role soldPrice status');
    res.json({ success: true, teams });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/teams/my/team
router.get('/my/team', protect, async (req, res) => {
  try {
    const team = await Team.findOne({ owner: req.user._id })
      .populate('players', 'name photo role soldPrice status');
    if (!team) return res.status(404).json({ success: false, message: 'No team assigned' });
    res.json({ success: true, team });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/teams/:id
router.get('/:id', protect, async (req, res) => {
  try {
    const team = await Team.findById(req.params.id)
      .populate('owner', 'name email')
      .populate('players', 'name photo role soldPrice status');
    if (!team) return res.status(404).json({ success: false, message: 'Team not found' });
    res.json({ success: true, team });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/teams
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const teamData = { ...req.body };
    teamData.purseRemaining = teamData.purse;

    if (req.files && req.files.logo) {
      const logo = req.files.logo;
      const uploadDir = path.join(__dirname, '../uploads/teams');
      fs.mkdirSync(uploadDir, { recursive: true });
      const fileName = 'team_' + Date.now() + path.extname(logo.name);
      await logo.mv(path.join(uploadDir, fileName));
      teamData.logo = '/uploads/teams/' + fileName;
    }

    const team = await Team.create(teamData);
    res.status(201).json({ success: true, team });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/teams/:id
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const existing = await Team.findById(req.params.id);
    if (!existing) return res.status(404).json({ success: false, message: 'Team not found' });

    const updateData = { ...req.body };

    // If purse changed, adjust purseRemaining accordingly
    if (updateData.purse && Number(updateData.purse) !== existing.purse) {
      const diff = Number(updateData.purse) - existing.purse;
      updateData.purseRemaining = existing.purseRemaining + diff;
    }

    if (req.files && req.files.logo) {
      const logo = req.files.logo;
      const uploadDir = path.join(__dirname, '../uploads/teams');
      fs.mkdirSync(uploadDir, { recursive: true });
      const fileName = 'team_' + Date.now() + path.extname(logo.name);
      await logo.mv(path.join(uploadDir, fileName));
      updateData.logo = '/uploads/teams/' + fileName;
    }

    const team = await Team.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json({ success: true, team });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /api/teams/:id
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    await Team.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Team deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/teams/:id/assign-owner
router.put('/:id/assign-owner', protect, adminOnly, async (req, res) => {
  try {
    const { ownerId } = req.body;
    const team = await Team.findByIdAndUpdate(req.params.id, { owner: ownerId || null }, { new: true });
    res.json({ success: true, team });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/teams/:id/manual-assign - Admin manually assigns player to team
router.put('/:id/manual-assign', protect, adminOnly, async (req, res) => {
  try {
    const { playerId, price } = req.body;
    if (!playerId || !price) return res.status(400).json({ success: false, message: 'Player and price required' });

    const team = await Team.findById(req.params.id);
    if (!team) return res.status(404).json({ success: false, message: 'Team not found' });

    if (price > team.purseRemaining) {
      return res.status(400).json({ success: false, message: 'Insufficient purse! Available: Rs.' + team.purseRemaining + 'L' });
    }

    const player = await Player.findByIdAndUpdate(playerId, {
      status: 'sold',
      soldPrice: price,
      soldTo: team._id,
    }, { new: true });

    if (!player) return res.status(404).json({ success: false, message: 'Player not found' });

    // Update team
    team.players.push(playerId);
    team.purseRemaining -= price;
    const roleMap = { 'Batsman': 'batsmen', 'Bowler': 'bowlers', 'All-Rounder': 'allRounders', 'Wicket-Keeper': 'wicketKeepers' };
    if (roleMap[player.role]) team.stats[roleMap[player.role]] = (team.stats[roleMap[player.role]] || 0) + 1;
    await team.save();

    res.json({ success: true, message: player.name + ' assigned to ' + team.name + ' for Rs.' + price + 'L', player, team });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/teams/recalculate/purse - Fix purse for all teams
router.put('/recalculate/purse', protect, adminOnly, async (req, res) => {
  try {
    const teams = await Team.find({});
    const results = [];
    for (const team of teams) {
      const soldPlayers = await Player.find({ soldTo: team._id, status: 'sold' });
      const totalSpent = soldPlayers.reduce((sum, p) => sum + (p.soldPrice || 0), 0);
      const newPurseRemaining = team.purse - totalSpent;
      await Team.findByIdAndUpdate(team._id, {
        purseRemaining: newPurseRemaining,
        players: soldPlayers.map(p => p._id)
      });
      results.push({ team: team.name, purse: team.purse, spent: totalSpent, remaining: newPurseRemaining });
    }
    res.json({ success: true, message: 'All teams purse recalculated!', results });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});
// PUT /api/teams/:id/manual-assign
router.put('/:id/manual-assign', protect, adminOnly, async (req, res) => {
  try {
    const { playerId, price } = req.body;
    if (!playerId || !price) return res.status(400).json({ success: false, message: 'Player and price required' });
    const team = await Team.findById(req.params.id);
    if (!team) return res.status(404).json({ success: false, message: 'Team not found' });
    if (price > team.purseRemaining) {
      return res.status(400).json({ success: false, message: 'Insufficient purse! Available: Rs.' + team.purseRemaining + 'L' });
    }
    const player = await Player.findByIdAndUpdate(playerId, {
      status: 'sold', soldPrice: price, soldTo: team._id,
    }, { new: true });
    if (!player) return res.status(404).json({ success: false, message: 'Player not found' });
    team.players.push(playerId);
    team.purseRemaining -= price;
    await team.save();
    res.json({ success: true, message: player.name + ' assigned!', player, team });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;