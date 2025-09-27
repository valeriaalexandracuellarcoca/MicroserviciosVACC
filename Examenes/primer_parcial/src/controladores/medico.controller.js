
const { AppDataSource } = require("../config/database");
const Medico = require("../entidades/Medico");

const medicoRepository = AppDataSource.getRepository(Medico);

const getMedicos = async (req, res) => {
    try {
        const medicos = await medicoRepository.find();
        res.json(medicos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createMedico = async (req, res) => {
    try {
        const newMedico = medicoRepository.create(req.body);
        const savedMedico = await medicoRepository.save(newMedico);
        res.status(201).json(savedMedico);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateMedico = async (req, res) => {
    try {
        const medico = await medicoRepository.findOneBy({ id: parseInt(req.params.id) });
        if (!medico) {
            return res.status(404).json({ message: "Médico no encontrado" });
        }
        medicoRepository.merge(medico, req.body);
        const updatedMedico = await medicoRepository.save(medico);
        res.json(updatedMedico);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteMedico = async (req, res) => {
    try {
        const result = await medicoRepository.delete(req.params.id);
        if (result.affected === 0) {
            return res.status(404).json({ message: "Médico no encontrado" });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getMedicos,
    createMedico,
    updateMedico,
    deleteMedico,
};
