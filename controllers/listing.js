const Listing = require("../models/listing")
module.exports.index = async(req, res) => {
    let alllistings = await Listing.find()

    res.render("listings/index", { alllistings })
}
module.exports.renderNewForm = (req, res) => {
    res.render("listings/new")
}
module.exports.showListing = async(req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({
        path: "reviews",
        populate: {
            path: "author"
        }
    }).populate("owner")
    if (!listing) {
        req.flash("error", "This listing you are looking for doesnot exist!")
        return res.redirect("/listings")
    }
    res.render("listings/show", { listing })

}

module.exports.createListing = async(req, res) => {

    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing)
    newListing.owner = req.user._id;
    newListing.image = { url, filename }
    await newListing.save();
    req.flash("success", "New listing Created")
    res.redirect("/listings")

}

module.exports.renderEditForm = async(req, res) => {
    let { id } = req.params
    const listing = await Listing.findById(id)
    if (!listing) {
        req.flash("error", "This listing you are looking for doesnot exist!")
        return res.redirect("/listings")
    }
    let originalUrl = listing.image.url

    originalUrl = originalUrl.replace("/upload", "/upload/h_250,w_250")

    res.render("listings/edit", { listing, originalUrl })


}

module.exports.updateListing = async(req, res) => {

    let { id } = req.params;
    let newlisting = req.body.listing
    let updatedlisting = await Listing.findByIdAndUpdate(id, newlisting, { new: false })
    if (typeof req.file != "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        updatedlisting.image = { url, filename }
        await updatedlisting.save()
    }
    req.flash("success", "Listing Updated")
    res.redirect(`/listings/${id}`)


}

module.exports.destroyListing = async(req, res) => {
    let { id } = req.params

    await Listing.findByIdAndDelete(id)
    req.flash("success", "Listing Deleted")
    res.redirect("/listings")
}

//https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60

module.exports.filteredPage = async(req, res) => {
    let { place } = req.query
    let newListing = await Listing.find({ category: place })
    res.render("listings/filteredPage", { newListing, place })
}