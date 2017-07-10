with import <nixpkgs> {};

stdenv.mkDerivation rec {
  name = "start.ffbsee";

  buildInputs = [
    jekyll
  ];
}
