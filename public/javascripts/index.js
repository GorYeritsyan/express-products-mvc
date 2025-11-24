window.addEventListener("click", async (e) => {
  if (e.target.dataset.action === "delete") {
    const productId = e.target.id;

    try {
      await fetch(`http://localhost:3000/${productId}`, {
        method: "DELETE",
      });

      window.location.reload();
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  }
});
