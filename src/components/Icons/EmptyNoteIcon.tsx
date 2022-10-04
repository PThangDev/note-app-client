import React, { FC } from 'react';

interface Props {
  width?: number;
  height?: number;
  className?: string;
}

const EmptyNoteIcon: FC<Props> = ({ width = 125, height = 125, className }) => {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 256.000000 256.000000"
      preserveAspectRatio="xMidYMid meet"
      className={className}
    >
      <g
        transform="translate(0.000000,256.000000) scale(0.100000,-0.100000)"
        fill="currentColor"
        stroke="none"
      >
        <path
          d="M919 2547 c-20 -8 -51 -24 -69 -37 -36 -26 -90 -104 -90 -132 0 -17
   -13 -18 -165 -18 -129 0 -173 -3 -195 -15 -17 -9 -30 -20 -30 -25 0 -6 -51
   -10 -125 -10 -150 0 -192 -15 -225 -80 -20 -39 -20 -57 -20 -1075 0 -997 1
   -1037 19 -1073 11 -22 35 -46 59 -60 l40 -22 881 0 c846 0 883 1 919 19 22 11
   46 35 60 59 l22 40 0 1036 c0 1019 0 1037 -20 1076 -33 65 -75 80 -225 80 -74
   0 -125 4 -125 10 0 5 -13 16 -30 25 -22 12 -66 15 -194 15 l-164 0 -7 29 c-10
   46 -59 107 -110 137 -55 32 -150 42 -206 21z m154 -114 c34 -17 63 -62 72
   -112 12 -62 10 -61 216 -61 l189 0 0 -100 0 -100 -550 0 -550 0 0 100 0 100
   191 2 c212 3 198 -2 218 75 15 55 46 90 96 108 42 14 72 11 118 -12z m-723
   -273 l0 -50 -63 0 c-36 0 -68 -5 -75 -12 -17 -17 -17 -1869 0 -1886 9 -9 89
   -12 298 -12 271 0 288 1 304 19 16 17 16 23 4 48 l-13 28 -253 3 -252 2 0 855
   0 855 35 0 c19 0 35 -4 35 -10 0 -5 13 -16 30 -25 25 -13 108 -15 600 -15 492
   0 575 2 600 15 17 9 30 20 30 25 0 6 16 10 35 10 l35 0 0 -855 0 -855 -252 -2
   -253 -3 -13 -28 c-12 -25 -12 -31 4 -48 16 -18 33 -19 304 -19 209 0 289 3
   298 12 17 17 17 1869 0 1886 -7 7 -39 12 -75 12 l-63 0 0 50 0 50 105 0 c92 0
   108 -3 125 -20 20 -20 20 -33 20 -1035 0 -1002 0 -1015 -20 -1035 -20 -20 -33
   -20 -880 -20 -847 0 -860 0 -880 20 -20 20 -20 33 -20 1035 0 1002 0 1015 20
   1035 17 17 33 20 125 20 l105 0 0 -50z"
        />
        <path
          d="M962 2348 c-15 -15 -15 -61 0 -76 7 -7 24 -12 38 -12 33 0 50 17 50
   50 0 33 -17 50 -50 50 -14 0 -31 -5 -38 -12z"
        />
        <path
          d="M542 1358 c-46 -46 47 -128 145 -128 45 0 110 28 137 59 16 17 18 27
   10 49 -12 35 -54 41 -90 13 -34 -27 -84 -27 -117 -1 -28 22 -67 26 -85 8z"
        />
        <path
          d="M1170 1351 c-15 -29 -12 -45 13 -69 31 -29 89 -52 132 -52 70 0 155
   52 155 95 0 46 -53 60 -97 25 -14 -11 -40 -20 -58 -20 -18 0 -44 9 -58 20 -32
   26 -73 26 -87 1z"
        />
        <path
          d="M902 1024 c-24 -17 -29 -53 -10 -72 8 -8 47 -12 108 -12 61 0 100 4
   108 12 19 19 14 55 -10 72 -31 22 -165 22 -196 0z"
        />
        <path
          d="M966 284 c-19 -18 -21 -55 -4 -72 15 -15 61 -15 76 0 28 28 2 88 -38
   88 -10 0 -26 -7 -34 -16z"
        />
        <path
          d="M2276 2544 c-9 -8 -16 -24 -16 -34 0 -35 28 -50 91 -50 l59 0 -75
   -101 c-41 -55 -75 -109 -75 -119 0 -38 37 -50 151 -50 90 0 110 3 130 19 20
   16 22 23 14 47 -10 27 -14 29 -73 32 -34 2 -62 6 -62 11 0 4 32 50 70 101 73
   97 81 118 54 144 -23 23 -245 23 -268 0z"
        />
        <path
          d="M2122 2028 c-16 -16 -15 -65 0 -74 7 -4 27 -10 45 -13 l32 -6 -45
   -59 c-49 -66 -57 -108 -25 -126 11 -5 56 -10 101 -10 96 0 120 10 120 48 0 37
   -17 52 -57 52 -18 0 -33 3 -33 6 0 3 20 32 45 64 45 59 55 96 33 118 -8 8 -47
   12 -108 12 -61 0 -100 -4 -108 -12z"
        />
      </g>
    </svg>
  );
};
export default EmptyNoteIcon;
