import { initializeApp } from "firebase/app";
import { v4 as uuid } from "uuid";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { getDatabase, ref, get, set, remove } from "firebase/database";
import { message } from "antd";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const database = getDatabase(app);
provider.setCustomParameters({
  prompt: "select_account",
});
export async function logIn() {
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    if (error.code === "auth/popup-closed-by-user") {
      message.warning("로그인이 취소되었습니다.");
    } else {
      message.warning("로그인 중 오류가 발생했습니다.");
    }
  }
}
export async function logOut() {
  signOut(auth).catch(console.error);
}
export function onUserStateChange(callback) {
  onAuthStateChanged(auth, async (user) => {
    const updateUser = user ? await adminUser(user) : null;
    callback(updateUser);
  });
}
async function adminUser(user) {
  return get(ref(database, "admins")).then((snapshot) => {
    if (snapshot.exists()) {
      const admins = snapshot.val();
      const isAdmin = admins.includes(user.uid);
      return { ...user, isAdmin };
    }
    return user;
  });
}

export async function addNewProduct(product, image) {
  const id = uuid();
  return set(ref(database, `products/${id}`), {
    ...product,
    id,
    price: parseInt(product.price),
    image,
    options: product.options.split(","),
  });
}
export async function getProducts() {
  return get(ref(database, "products")).then((snapshot) => {
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    }
    return [];
  });
}
export async function getCart(userId) {
  return get(ref(database, `carts/${userId}`)).then((snapshop) => {
    const items = snapshop.val() || {};
    return Object.values(items);
  });
}
export async function addOrUpdateToCart(userId, product) {
  return set(
    ref(database, `carts/${userId}/${product.id}${product.option}`),
    product
  );
}
export async function removeFromCart(userId, productId) {
  return remove(ref(database, `carts/${userId}/${productId}`));
}
export async function signUp(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await set(ref(database, `users/${user.uid}`), {
      email: user.email,
      createdAt: new Date().toISOString(),
    });
    await signOut(auth);
  } catch (error) {
    throw new Error(`회원가입 중 오류가 발생했습니다: ${error.message}`);
  }
}

export async function signIn(email, password) {
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      throw new Error(`로그인 중 오류가 발생했습니다: ${error.message}`);
    });
}
