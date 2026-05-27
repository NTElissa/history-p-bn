import Exhibit from '../models/exhibitModule.js';

export const createExhibit = async (req, res) => {
  try {
    const { title, description, category, imageUrl, arFrameworkType, audioUrl } = req.body;
    const newExhibit = new Exhibit({
      title,
      description,
      category,
      imageUrl,
      arFrameworkType,
      audioUrl
    });
    await newExhibit.save();
    res.status(201).json({ message: 'Exhibit created successfully', exhibit: newExhibit });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getExhibits = async (req, res) => {
  try {
    const exhibits = await Exhibit.find();
    res.status(200).json(exhibits);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getExhibitById = async (req, res) => {
  try {
    const exhibit = await Exhibit.findById(req.params.id);
    if (!exhibit) {
      return res.status(404).json({ message: 'Exhibit not found' });
    }
    res.status(200).json(exhibit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateExhibit = async (req, res) => {
  try {
    const updatedExhibit = await Exhibit.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedExhibit) {
      return res.status(404).json({ message: 'Exhibit not found' });
    }
    res.status(200).json({ message: 'Exhibit updated successfully', exhibit: updatedExhibit });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteExhibit = async (req, res) => {
  try {
    const deletedExhibit = await Exhibit.findByIdAndDelete(req.params.id);
    if (!deletedExhibit) {
      return res.status(404).json({ message: 'Exhibit not found' });
    }
    res.status(200).json({ message: 'Exhibit deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
