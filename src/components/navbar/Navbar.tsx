import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "../../services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import * as S from "./styles";
import { FiLogOut } from "react-icons/fi";

const Navbar = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const getShortenedName = (fullName: string | null): string => {
    if (!fullName) {
      return "";
    }
    const words = fullName.split(" ");
    return words.slice(0, 1).join(" ");
  };

  const signWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Erro ao fazer login com Google", error);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <S.StyledNavbar>
      {user && <NavLink to="/">Home</NavLink>}
      {user && <NavLink to="/entradas/saídas">Criar Despesas</NavLink>}
      {user && <NavLink to="/dashboard">Dashboard</NavLink>}

      {user ? (
        <S.ProfileContainer>
          <S.UserImage src={user.photoURL} alt="Foto de perfil" />
          {/* {showUserName && <p>Olá, {user.displayName}!</p>} */}
          <S.UserName>Olá, {getShortenedName(user.displayName)}!</S.UserName>
          <S.LogoutButton onClick={handleSignOut}>
            <FiLogOut />
            Sair
          </S.LogoutButton>
        </S.ProfileContainer>
      ) : (
        <S.LogintButton onClick={signWithGoogle}>Login</S.LogintButton>
      )}
    </S.StyledNavbar>
  );
};

export default Navbar;