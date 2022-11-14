import React, { useState, useEffect, useCallback } from "react";
import { Text, View, ScrollView, Image, TouchableOpacity, TextInput, Platform, ImagePickerIOS, Dimensions, Switch, ActivityIndicator } from "react-native";
import { HStack, VStack, Select } from "native-base";
import RandomStyle from "../../../stylesheets/randomStyle";
import ImageView from "react-native-image-viewing";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CheckboxBtn from "../../../stylesheets/checkboxBtn";
import BhButton from "../../../stylesheets/button";
import Form1 from "../../../stylesheets/form1";
import * as ImagePicker from "expo-image-picker";
import MapUpdate from "../../maps/MapUpdate";
import { useDispatch, useSelector } from "react-redux";
import { updateDump, clearErrors } from "../../../Redux/Actions/dumpActions";
import Toast from 'react-native-toast-message';
import { RESET_COORDINATE } from "../../../Redux/Constants/mapConstants";
import { UPDATE_DUMP_RESET } from "../../../Redux/Constants/dumpConstants";
import { useFocusEffect } from "@react-navigation/native";
const PublicReportsUpdate = (props) => {
    const dump = props.route.params.item
    const dispatch = useDispatch()
    const { latitude: mapLatitude, longitude: mapLongtitude } = useSelector(state => state.coordinate)

    const { isUpdated, isUpdatedStatus, loading: updateLoading, error: updateError, dump: updatedDump } = useSelector(state => state.dump)

    let longitude = 0
    let latitude = 0
    const [openImages, setOpenImages] = useState(false);
    const [imgIndex, setImgIndex] = useState(0);
    const [openImages1, setOpenImages1] = useState(false);
    const [imgIndex1, setImgIndex1] = useState(0);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [oldImagesPreview, setOldImagesPreview] = useState([]);
    const [oldImagesPublic, setOldImagesPublic] = useState([]);
    const [type, setType] = useState("");
    const [complete_address, setComplete_address] = useState('')
    const [landmark, setLandmark] = useState('')
    const [barangay, setBarangay] = useState('')
    const [waste_type, setWaste_type] = useState([])
    const [waste_desc, setWaste_desc] = useState('')
    const [waste_size, setWaste_size] = useState('')
    const [accessible_by, setAccessible_by] = useState('')
    const [category_violation, setCategory_violation] = useState('')
    const [additional_desciption, setAdditional_desciption] = useState('')
    const [reportUsing, setReportUsing] = useState('')
    const [reportAnonymously, setReportAnonymously] = useState()
    const [typeAC, setTypeAC] = useState(false);
    const [typeAU, setTypeAU] = useState(false);
    const [typeBU, setTypeBU] = useState(false);
    const [typeCO, setTypeCO] = useState(false);
    const [typeEL, setTypeEL] = useState(false);
    const [typeHZ, setTypeHZ] = useState(false);
    const [typeHH, setTypeHH] = useState(false);
    const [typeLW, setTypeLW] = useState(false);
    const [typeMC, setTypeMC] = useState(false);
    const [typePP, setTypePP] = useState(false);
    const [typePL, setTypePL] = useState(false);
    const [typeGB, setTypeGB] = useState(false);
    const [typeOF, setTypeOF] = useState(false);
    const [typeOther, setTypeOther] = useState(false);
    const [mapHeight, setMapHeight] = useState(0);
    const [mapWidth, setMapWidth] = useState(0);
    const [btnAdd, setBtnAdd] = useState(false);

    // const setLongitude = (longitudeValue) =>{
    //     longitude =
    // }



    (async () => {
        if (Platform.OS !== "web") {

            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== "granted") {
                alert("Permission to access camera is needed to upload images")
            }

        }
    })();

    const barangays = [
        "Bagumbayan",
        "Bambang",
        "Calzada",
        "Hagonoy",
        "Ibayo-Tipas",
        "Ligid-Tipas",
        "Lower Bicutan",
        "New Lower Bicutan",
        "Napindan",
        "Palingon",
        "San Miguel",
        "Santa Ana",
        "Tuktukan",
        "Ususan",
        "Wawa",
        "Central Bicutan",
        "Central Signal Village",
        "Fort Bonifacio",
        "Katuparan",
        "Maharlika Village",
        "North Daang Hari",
        "North Signal Village",
        "Pinagsama",
        "South Daang Hari",
        "South Signal Village",
        "Tanyag",
        "Upper Bicutan",
        "Western Bicutan",
    ]

    useFocusEffect(
        useCallback(() => {
            console.log("dump", dump)
            setComplete_address(dump.complete_address)
            setLandmark(dump.landmark)
            setBarangay(dump.barangay)

            setOldImages([])
            dump.images.forEach(image => {
                setOldImages(oldArray => [...oldArray, image.url])
            })
            setOldImagesPreview([])
            dump.images.forEach(image => {
                setOldImagesPreview(oldArray => [...oldArray, { uri: image.url }])
            })


            setOldImagesPublic([])
            dump.images.forEach(image => {
                setOldImagesPublic(oldArray => [...oldArray, image.public_id])
            })

            dump && dump.waste_type && dump.waste_type.forEach(type => {
                setWaste_type(oldArray => [...oldArray, type.type])
            })

            setReportAnonymously(dump.report_using === "Anonymous" ? true : false)

            setAdditional_desciption(dump.additional_desciption)
            setWaste_size(dump.waste_size)
            setAccessible_by(dump.accessible_by)
            if (isUpdated) {
                Toast.show({
                    type: 'success',
                    text1: 'Updated Successfully',
                    text2: 'Your illegal dump report has been updated'
                });
                setImages([]);
                setImagesPreview([]);
                setOldImages([]);
                setOldImagesPreview([]);
                setOldImagesPublic([]);
                setComplete_address('')
                setLandmark('')
                setBarangay('')
                setWaste_type([])
                setWaste_desc('')
                setWaste_size('')
                setAccessible_by('')
                setCategory_violation('')
                setAdditional_desciption('')
                setReportUsing('')
                setReportAnonymously(false)
                dispatch({ type: RESET_COORDINATE })
                dispatch({ type: UPDATE_DUMP_RESET })
                console.log("success")
                props.navigation.navigate('UserReportsList');
            }
            if (updateError) {
                Toast.show({
                    type: 'error',
                    text1: updateError,
                    text2: 'Something went wrong, please try again later'
                });
                console.log(updateError)
                dispatch(clearErrors())
            }
        }, [isUpdated, updateError])
    )



    const pickImage = async () => {

        // **** ___5 images

        let result = await ImagePicker.launchImageLibraryAsync({
            base64: true,
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 0.1
        });

        if (!result.cancelled) {
            let imageUri = result ? `data:image/jpg;base64,${result.base64}` : null;
            setImages(oldArray => [...oldArray, imageUri])
            setImagesPreview(items => [...items, { uri: result.uri, base64: imageUri }])
        }
    }

    const capImage = async () => {

        // **** ___5 images

        let result = await ImagePicker.launchCameraAsync({
            base64: true,
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            quality: 0.1
        });

        if (!result.cancelled) {
            let imageUri = result ? `data:image/jpg;base64,${result.base64}` : null;
            setImages(oldArray => [...oldArray, imageUri])
            setImagesPreview(items => [...items, { uri: result.uri, base64: imageUri }])
        }
    }


    const showImages = (index) => {
        setOpenImages(true);
        setImgIndex(index);
    }

    const showImages1 = (index) => {
        setOpenImages1(true);
        setImgIndex1(index);
    }


    const onLayout = (event) => {
        const { x, y, height, width } = event.nativeEvent.layout;
        setMapHeight(height)
        setMapWidth(width)
    }

    const submitHandle = () => {
        // // **** ___Add Filters here
        console.log(imagesPreview.length)
        console.log(images.length)
        console.log(landmark)
        console.log(barangay)
        console.log(waste_type)
        console.log(waste_desc)
        console.log(waste_size)
        console.log(accessible_by)
        console.log(category_violation)
        console.log(additional_desciption)
        console.log(reportUsing)
        console.log(reportAnonymously)
        console.log(mapLatitude)
        console.log(mapLongtitude)
        const formData = new FormData();

        formData.append("latitude", mapLatitude && mapLatitude);
        formData.append("longtitude", mapLongtitude && mapLongtitude);
        formData.append("complete_address", complete_address);
        formData.append("landmark", landmark);
        formData.append("barangay", barangay);
        if (waste_type.includes("Other")) {
            formData.append("waste_desc", waste_desc);
        } else {
            formData.append("waste_desc", "");
        }

        if (btnAdd) {
            formData.append("waste_size", waste_size);
            formData.append("accessible_by", accessible_by);
            formData.append("category_violation", category_violation);
        }

        formData.append("additional_desciption", additional_desciption);


        oldImagesPublic.forEach(oIP => {
            formData.append('oldImagesPublic', oIP)
        })
        images.forEach(images => {
            formData.append('images', images)
        })
        oldImages.forEach(oI => {
            formData.append('oldImages', oI)
        })

        waste_type.forEach(wt => {
            formData.append('waste_type', wt)
        })

        if (reportAnonymously === true) {
            formData.append("reportUsing", "Anonymous")
        } else {
            formData.append("reportUsing", "Alias")
        }

        dispatch(updateDump(dump._id, formData))
    }

    const removeOldImage = (image, public_url) => {
        //  console.log("oldImagesPreview", oldImagesPreview)
        // console.log("image", image)
        setOldImages(oldImages.filter(type => type !== image))
        setOldImagesPreview(oldImagesPreview.filter(type => type.uri !== image))

        setOldImagesPublic(oldImagesPublic.filter(type => type !== public_url))
        setImages(images.filter(type => type !== image))
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={RandomStyle.vContainer}>
                <View style={RandomStyle.vHeader}>
                    <Text style={RandomStyle.vText1}>Updating an Illegal Dump</Text>
                </View>

                <HStack justifyContent={"space-between"}>
                    <BhButton medium onPress={pickImage}>
                        <Text style={{ color: "white" }}>Upload Image</Text>
                    </BhButton>
                    <BhButton medium onPress={capImage}>
                        <Text style={{ color: "white" }}>Capture Image</Text>
                    </BhButton>
                </HStack>
                <Text>Old Images</Text>
                <View style={RandomStyle.vImages}>
                    {oldImages.length > 0 ?
                        oldImages.map((img, index) =>
                            <View key={index}>
                                <TouchableOpacity style={{ zIndex: 999 }} onPress={() => removeOldImage(img, oldImagesPublic[index])}>
                                    <MaterialCommunityIcons size={20} style={RandomStyle.vBadge} name="close" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => showImages1(index)}>
                                    <Image style={RandomStyle.vImage} source={{ uri: img }} resizeMode="cover" />
                                </TouchableOpacity>
                            </View>
                        ) : null
                    }
                    <ImageView
                        images={oldImagesPreview}
                        imageIndex={imgIndex1}
                        visible={openImages1}
                        onRequestClose={() => setOpenImages1(false)}
                    />

                </View>

                <Text>Add Images</Text>
                <View style={RandomStyle.vImages}>
                    {images.length > 0 ?
                        images.map((img, index) =>
                            <View key={index}>
                                <TouchableOpacity style={{ zIndex: 999 }} onPress={() => removeOldImage(img)}>
                                    <MaterialCommunityIcons size={20} style={RandomStyle.vBadge} name="close" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => showImages(index)}>
                                    <Image style={RandomStyle.vImage} source={{ uri: img }} resizeMode="cover" />
                                </TouchableOpacity>
                            </View>
                        ) : null
                    }
                    <ImageView
                        images={imagesPreview}
                        imageIndex={imgIndex}
                        visible={openImages}
                        onRequestClose={() => setOpenImages(false)}
                    />

                </View>

                <VStack>
                    <Text style={RandomStyle.vText2}>Complete Location Address: </Text>
                    <TextInput value={complete_address} onChangeText={(complete_address_value) => { setComplete_address(complete_address_value) }} placeholder="..." style={Form1.textInput2} />
                </VStack>
                <VStack>
                    <Text style={RandomStyle.vText2}>Nearest Landmark: </Text>
                    <TextInput value={landmark} onChangeText={(landmark_value) => { setLandmark(landmark_value) }} placeholder="..." style={Form1.textInput2} />
                </VStack>

                <Text style={RandomStyle.vText2}>Barangay</Text>
                <Select
                    selectedValue={barangay}
                    onValueChange={(barangay_value) => setBarangay(barangay_value)}>
                    {barangays.map((barangay) =>
                        <Select.Item key={barangay} value={barangay} label={barangay} />
                    )

                    }

                </Select>

                <View style={{ width: 50, justifyContent: 'center', borderWidth: 0, alignItems: 'center', position: "relative", left: (mapWidth / 2) - 25, top: (mapHeight / 2) + 2, zIndex: 5 }}>
                    <Image style={{ height: 50, width: 50, zIndex: 1 }} source={{ uri: "https://img.icons8.com/glyph-neue/100/26ff00/marker.png" }} resizeMode="stretch" />
                </View>


                <View onLayout={onLayout} style={RandomStyle.vMapContainer}>
                    <MapUpdate long={dump.coordinates.longtitude} lati={dump.coordinates.latitude} />
                </View>


                <Text style={RandomStyle.vText2}>Type of Waste</Text>
                <View style={RandomStyle.vContainer2}>
                    <CheckboxBtn isChecked={waste_type.includes("Animal Corpse")} /*onPress={()=>setTypeAC(!typeAC)}*/ onPress={(e) => { !waste_type.includes("Animal Corpse") ? setWaste_type(oldArray => [...oldArray, "Animal Corpse"]) : setWaste_type(waste_type.filter(type => type !== "Animal Corpse")) }} >
                        <Text style={{ color: "white" }}>Animal Corpse</Text>
                    </CheckboxBtn>
                    <CheckboxBtn isChecked={waste_type.includes("Automotive")} /*onPress={()=>setTypeAU(!typeAU)}*/ onPress={(e) => { !waste_type.includes("Automotive") ? setWaste_type(oldArray => [...oldArray, "Automotive"]) : setWaste_type(waste_type.filter(type => type !== "Automotive")) }}>
                        <Text style={{ color: "white" }}>Automotive</Text>
                    </CheckboxBtn>
                    <CheckboxBtn isChecked={waste_type.includes("Burned")} /*onPress={()=>setTypeBU(!typeBU)}*/ onPress={(e) => { !waste_type.includes("Burned") ? setWaste_type(oldArray => [...oldArray, "Burned"]) : setWaste_type(waste_type.filter(type => type !== "Burned")) }}>
                        <Text style={{ color: "white" }}>Burned</Text>
                    </CheckboxBtn>
                    <CheckboxBtn isChecked={waste_type.includes("Construction")} /*onPress={()=>setTypeCO(!typeCO)}*/ onPress={(e) => { !waste_type.includes("Construction") ? setWaste_type(oldArray => [...oldArray, "Construction"]) : setWaste_type(waste_type.filter(type => type !== "Construction")) }}>
                        <Text style={{ color: "white" }}>Construction</Text>
                    </CheckboxBtn>
                    <CheckboxBtn isChecked={waste_type.includes("Electronics")} /*onPress={()=>setTypeEL(!typeEL)}*/ onPress={(e) => { !waste_type.includes("Electronics") ? setWaste_type(oldArray => [...oldArray, "Electronics"]) : setWaste_type(waste_type.filter(type => type !== "Electronics")) }}>
                        <Text style={{ color: "white" }}>Electronics</Text>
                    </CheckboxBtn>
                    <CheckboxBtn isChecked={waste_type.includes("Hazardous")} /*onPress={()=>setTypeHZ(!typeHZ)}*/ onPress={(e) => { !waste_type.includes("Hazardous") ? setWaste_type(oldArray => [...oldArray, "Hazardous"]) : setWaste_type(waste_type.filter(type => type !== "Hazardous")) }}>
                        <Text style={{ color: "white" }}>Hazardous</Text>
                    </CheckboxBtn>
                    <CheckboxBtn isChecked={waste_type.includes("Household")} /*onPress={()=>setTypeHH(!typeHH)}*/ onPress={(e) => { !waste_type.includes("Household") ? setWaste_type(oldArray => [...oldArray, "Household"]) : setWaste_type(waste_type.filter(type => type !== "Household")) }}>
                        <Text style={{ color: "white" }}>Household</Text>
                    </CheckboxBtn>
                    <CheckboxBtn isChecked={waste_type.includes("Liquid Waste")} /*onPress={()=>setTypeLW(!typeLW)}*/ onPress={(e) => { !waste_type.includes("Liquid Waste") ? setWaste_type(oldArray => [...oldArray, "Liquid Waste"]) : setWaste_type(waste_type.filter(type => type !== "Liquid Waste")) }}>
                        <Text style={{ color: "white" }}>Liquid Waste</Text>
                    </CheckboxBtn>
                    <CheckboxBtn isChecked={waste_type.includes("Metal/Can")} /*onPress={()=>setTypeMC(!typeMC)}*/ onPress={(e) => { !waste_type.includes("Metal/Can") ? setWaste_type(oldArray => [...oldArray, "Metal/Can"]) : setWaste_type(waste_type.filter(type => type !== "Metal/Can")) }}>
                        <Text style={{ color: "white" }}>Metal/Can</Text>
                    </CheckboxBtn>
                    <CheckboxBtn isChecked={waste_type.includes("Paper")} /*onPress={()=>setTypePP(!typePP)}*/ onPress={(e) => { !waste_type.includes("Paper") ? setWaste_type(oldArray => [...oldArray, "Paper"]) : setWaste_type(waste_type.filter(type => type !== "Paper")) }}>
                        <Text style={{ color: "white" }}>Paper</Text>
                    </CheckboxBtn>
                    <CheckboxBtn isChecked={waste_type.includes("Plastic")} /*onPress={()=>setTypePL(!typePL)}*/ onPress={(e) => { !waste_type.includes("Plastic") ? setWaste_type(oldArray => [...oldArray, "Plastic"]) : setWaste_type(waste_type.filter(type => type !== "Plastic")) }}>
                        <Text style={{ color: "white" }}>Plastic</Text>
                    </CheckboxBtn>
                    <CheckboxBtn isChecked={waste_type.includes("Glass Bottle")} /*onPress={()=>setTypeGB(!typeGB)}*/ onPress={(e) => { !waste_type.includes("Glass Bottle") ? setWaste_type(oldArray => [...oldArray, "Glass Bottle"]) : setWaste_type(waste_type.filter(type => type !== "Glass Bottle")) }}>
                        <Text style={{ color: "white" }}>Glass Bottle</Text>
                    </CheckboxBtn>
                    <CheckboxBtn isChecked={waste_type.includes("Organic/Food")} /*onPress={()=>setTypeOF(!typeOF)}*/ onPress={(e) => { !waste_type.includes("Organic/Food") ? setWaste_type(oldArray => [...oldArray, "Organic/Food"]) : setWaste_type(waste_type.filter(type => type !== "Organic/Food")) }}>
                        <Text style={{ color: "white" }}>Organic/Food</Text>
                    </CheckboxBtn>
                    <CheckboxBtn isChecked={waste_type.includes("Other")} /*onPress={()=>setTypeOther(!typeOther)}*/ onPress={(e) => { !waste_type.includes("Other") ? setWaste_type(oldArray => [...oldArray, "Other"]) : setWaste_type(waste_type.filter(type => type !== "Other")) }}>
                        <Text style={{ color: "white" }}>Other</Text>
                    </CheckboxBtn>


                    {waste_type.includes("Other") ?
                        <TextInput onChangeText={(waste_desc_value) => { setWaste_desc(waste_desc_value) }} style={Form1.textInput2} placeholder="If other, please specify here" />
                        : null
                    }
                </View>
                {console.log("reportAnonymously", reportAnonymously)}
                <HStack alignItems="center" space={1}>
                    <Text style={RandomStyle.vText2} fontSize="lg">Report Anonymously</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#2B822E" }}
                        thumbColor={reportAnonymously ? "#09DE10" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={(report_anonymously_value) => setReportAnonymously(report_anonymously_value)}
                        value={reportAnonymously}
                    />
                </HStack>

                <Text style={RandomStyle.vText2}>Additional Details</Text>
                <View style={RandomStyle.vContainer2}>
                    <TextInput value={additional_desciption} onChangeText={(additional_desciption_value) => { setAdditional_desciption(additional_desciption_value) }} textAlignVertical="top" numberOfLines={3} style={Form1.textInput2} />
                </View>

                <View style={RandomStyle.vContainer3}>
                    <BhButton gray={!btnAdd} center large onPress={() => setBtnAdd(!btnAdd)}>
                        <Text style={{ color: "white" }}>Add more info (Optional)</Text>
                    </BhButton>

                    {btnAdd === true ?
                        <VStack>
                            <Text style={RandomStyle.vText2}>Size of Waste</Text>
                            <Select
                                selectedValue={waste_size} onValueChange={(waste_size_value) => setWaste_size(waste_size_value)}
                            >
                                <Select.Item value="Trash Bin" label="Trash Bin" />
                                <Select.Item value="Dump Truck" label="Dump Truck" />
                            </Select>

                            <Text style={RandomStyle.vText2}>Accessible by</Text>
                            <Select
                                selectedValue={accessible_by} onValueChange={(accessible_by_value) => setAccessible_by(accessible_by_value)}>
                                <Select.Item value="People Only" label="People Only" />
                                <Select.Item value="Tricycle" label="Tricycle" />
                                <Select.Item value="Motorcycle" label="Motorcycle" />
                                <Select.Item value="Truck/Car" label="Truck/Car" />
                                <Select.Item value="Boat" label="Boat" />
                            </Select>
                        </VStack> : null
                    }
                </View>
                {updateLoading ?
                    <BhButton center medium disabled>
                        <ActivityIndicator size="small" color="#00ff00" />
                    </BhButton>
                    :
                    <BhButton center medium onPress={submitHandle}>
                        <Text style={{ color: "white" }}>Submit</Text>
                    </BhButton>
                }


            </View>
        </ScrollView>
    )
}

export default PublicReportsUpdate;