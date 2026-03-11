'use client';
import React from 'react';
import { useQRCode } from 'next-qrcode';

export default function QRCode({ text, colors }) {
  const { SVG } = useQRCode();
  return (
    <SVG
      text={text}
      options={{
        margin: 2,
        width: 200,
        color: {
          dark: colors?.dark || '#010599FF',
          light: colors?.light || '#FFBF60FF',
        },
      }}
    />
  );
}
  