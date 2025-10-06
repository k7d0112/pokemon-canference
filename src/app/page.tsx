"use client";

import { useState, useEffect, useCallback } from "react";
import { ScrollArea } from "../components/ui/scroll-area";
import { PokemonListItem } from "../components/PokemonListItem";
import { PokemonHeroDisplay } from "../components/PokemonHeroDisplay";
import { pokemonService, type PokemonDetailWithJapanese } from "@/services/pokemonService";
import type { PokemonListResponse } from "@/api/pokemon.api";
import { Loader2, X } from "lucide-react";
import { Button } from "../components/ui/button";
import { useSearch } from "@/contexts/SearchContext";

export function ModernPokedex() {
  const [pokemonList, setPokemonList] = useState<PokemonListResponse | null>(null);
  const [allLoadedPokemon, setAllLoadedPokemon] = useState<{name: string; url: string; japaneseName?: string}[]>([]);
  const [filteredPokemon, setFilteredPokemon] = useState<{name: string; url: string; japaneseName?: string}[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetailWithJapanese | null>(null);
  const [selectedPokemonUrl, setSelectedPokemonUrl] = useState<string>("");
  const { searchTerm, setSearchTerm } = useSearch();
  const [loading, setLoading] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);

  // TODO: 実装課題3 - 詳細表示（モーダルなし）
  // ポケモンをクリックした時にメイン画面に詳細を表示する処理を実装
  const handlePokemonSelect = useCallback(async (pokemonUrl: string) => {
    // ここに詳細取得・表示処理を実装
  }, []);

  useEffect(() => {
    loadPokemonList();
  }, []);

  // ポケモンリストが更新されたら、日本語名を取得
  useEffect(() => {
    if (pokemonList && pokemonList.results.length > 0) {
      const loadJapaneseNames = async () => {
        const pokemonWithJapaneseNames = await Promise.all(
          pokemonList.results.map(async (pokemon) => {
            const pokemonId = pokemonService.extractIdFromResourceUrl(pokemon.url);
            if (pokemonId) {
              const japaneseName = await pokemonService.getPokemonNameInJapanese(pokemonId);
              return { ...pokemon, japaneseName };
            }
            return pokemon;
          })
        );
        setAllLoadedPokemon(pokemonWithJapaneseNames);
      };
      loadJapaneseNames();
    }
  }, [pokemonList]);

  // TODO: 実装課題1 - 基本フィルタリング処理
  // ポケモンリストから表示用のリストを作成
  useEffect(() => {
    if (pokemonList && pokemonList.results.length > 0) {
      const loadJapaneseNames = async () => {
        const pokemonWithJapaneseNames = await Promise.all(
          pokemonList.results.map(async (pokemon) => {
            const pokemonId = pokemonService.extractIdFromResourceUrl(pokemon.url);
            if (pokemonId) {
              const japaneseName = await pokemonService.getPokemonNameInJapanese(pokemonId);
              return { ...pokemon, japaneseName };
            }
            return pokemon;
          })
        );
        setAllLoadedPokemon(pokemonWithJapaneseNames);
      };
      loadJapaneseNames();
    }
  }, [pokemonList]);

  // TODO: 実装課題4 - 検索機能実装
  // 日本語・英語名での部分一致検索機能を実装
  useEffect(() => {
    // ここに検索フィルタリング処理を実装
    if (allLoadedPokemon.length > 0) {

      setFilteredPokemon(allLoadedPokemon);
    }
  }, [allLoadedPokemon, searchTerm]);

  // TODO: 実装課題1 - リスト取得、表示
  // 初期表示時に24件のポケモンを取得する処理を実装
  const loadPokemonList = async () => {
    try {
      setLoading(true);
      const data = await pokemonService.getPokemonList(24, 0); // 適切な数のポケモンを読み込み
      setPokemonList(data);
    } catch (error) {
      console.error('ポケモンリストの取得に失敗しました:!!!!', error);
    } finally {
      setLoading(false);
    }
  };


  // TODO: 実装課題2 - 追加読み込み実装
  // 「もっと見る」ボタンで追加24件を取得する処理を実装
  const loadMorePokemon = async () => {
    // ここに追加読み込み処理を実装
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gray-100">
      {/* メインコンテンツ */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 上部: 選択中のポケモン表示 */}
        <div className="h-1/2 relative overflow-hidden">
          {loadingDetail ? (
            <div className="flex items-center justify-center h-full bg-white">
              <div className="text-center">
                <Loader2 className="w-8 h-8 animate-spin text-gray-600 mb-2 mx-auto" />
                <p className="text-gray-500">読み込み中...</p>
              </div>
            </div>
          ) : (
            <PokemonHeroDisplay
              pokemon={selectedPokemon}
            />
          )}
        </div>

        {/* 下部: ポケモンリスト */}
        <div className="h-1/2 bg-white flex flex-col">
          <div className="flex-shrink-0 px-4 py-3 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <p className="text-gray-700">
                  {searchTerm && (
                    <span className="text-sm text-gray-500">
                      「{searchTerm}」の検索結果:
                    </span>
                  )}
                  {filteredPokemon.length}匹のポケモン
                </p>
                {searchTerm && (
                  <Button
                    onClick={() => setSearchTerm("")}
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-4 h-4 mr-1" />
                    クリア
                  </Button>
                )}
              </div>
              <span className="text-gray-500 text-sm">音順</span>
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div className="px-4 py-2 space-y-1">
              {loading && filteredPokemon.length === 0 ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-gray-600" />
                </div>
              ) : (
                <>
                  {filteredPokemon.map((pokemon) => (
                    <PokemonListItem
                      key={pokemon.name}
                      name={pokemon.name}
                      url={pokemon.url}
                      onClick={() => handlePokemonSelect(pokemon.url)}
                      isSelected={selectedPokemonUrl === pokemon.url}
                    />
                  ))}

                  {/* TODO: 実装課題2 - もっと見るボタンUI */}
                  {/* ここに「もっと見る」ボタンを実装 */}
                </>
              )}

              {/* 検索結果なし */}
              {filteredPokemon.length === 0 && !loading && searchTerm && (
                <div className="text-center py-8">
                  <p className="text-gray-500">「{searchTerm}」に一致するポケモンが見つかりませんでした。</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>

    </div>
  );
}

export default ModernPokedex;