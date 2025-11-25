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

  if (e.target.dataset.action === "add-to-cart") {
    const productId = e.target.id;
    try {
      await fetch(`http://localhost:3000/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });
      alert("Product added to cart!");
    } catch (err) {
      console.error("Error adding product to cart:", err);
    }
  }

  // Edit product
  if (e.target.dataset.action === "edit-product") {
    const productId = e.target.id;

    const title = document.getElementById("title").value;
    const price = document.getElementById("price").value;
    const category = document.getElementById("category").value;

    try {
      await fetch(`http://localhost:3000/products/${productId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, price, category }),
      });
      window.location.href = "/";
    } catch (err) {
      console.error("Error updating product:", err);
    }
  }

  if (e.target.dataset.action === "remove-from-cart") {
    const productId = e.target.id;

    try {
      await fetch(`http://localhost:3000/cart/${productId}`, {
        method: "DELETE",
      });
      window.location.reload();
    } catch (err) {
      console.error("Error removing item from cart:", err);
    }
  }
});
