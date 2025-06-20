const db = require('../utils/database');

exports.create_input = (req, res) => { 
    const { c_input, c_rule, c_temperature, c_note, t_category_id } = req.body;
    const sql = `INSERT INTO t_input (c_input, c_rule, c_temperature, c_note, t_category_id) VALUES (?, ?, ?, ?, ?)`;
    const input_trimmed = c_input ? c_input.trim() : null;
    const rule_trimmed = c_rule ? c_rule.trim() : null;
    const note_trimmed = c_note ? c_note.trim() : null;
    db.run(sql, [input_trimmed, rule_trimmed, c_temperature, note_trimmed, t_category_id], function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ message: 'Input added successfully', id: this.lastID });
    });
};

exports.get_all_inputs = (req, res) => {
    const sql = `SELECT * FROM t_input`;
    db.all(sql, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

exports.delete_input = (req, res) => {
    const { c_id } = req.params;
    const sql = `DELETE FROM t_input WHERE c_id = ?`;
    db.run(sql, [c_id], function(err) {
        if (err) return res.status(400).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: `ID ${c_id} not found` });
        res.json({ message: 'Input deleted successfully' });
    });
};