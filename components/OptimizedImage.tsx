import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { Image, ImageSource } from 'expo-image';

interface OptimizedImageProps {
  source: ImageSource;
  style?: any;
  placeholder?: ImageSource;
  onLoad?: () => void;
  onError?: () => void;
  contentFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  transition?: number;
  priority?: 'low' | 'normal' | 'high';
}

export const OptimizedImage = React.memo<OptimizedImageProps>(({
  source,
  style,
  placeholder,
  onLoad,
  onError,
  contentFit = 'cover',
  transition = 200,
  priority = 'normal',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setHasError(true);
    onError?.();
  }, [onError]);

  if (hasError) {
    return (
      <View style={[styles.errorContainer, style]}>
        {placeholder && (
          <Image
            source={placeholder}
            style={style}
            contentFit={contentFit}
            cachePolicy="memory-disk"
          />
        )}
      </View>
    );
  }

  return (
    <Image
      source={source}
      style={style}
      contentFit={contentFit}
      transition={transition}
      placeholder={placeholder}
      onLoad={handleLoad}
      onError={handleError}
      cachePolicy="memory-disk"
      priority={priority}
      allowDownscaling={true}
      recyclingKey={typeof source === 'object' && 'uri' in source ? source.uri : undefined}
    />
  );
});

OptimizedImage.displayName = 'OptimizedImage';

const styles = StyleSheet.create({
  errorContainer: {
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
});